import { Injectable } from '@nestjs/common';
import sequelize, { Includeable, Op } from 'sequelize';

@Injectable()
export class QueryBuilderHelper {
  protected query: any;
  protected model;
  protected relation;
  protected customField = [];
  protected groupByField = [];
  protected join = [];
  protected condition;
  protected extraOptions;

  constructor(model, query) {
    this.query = query;
    this.model = model;
  }

  public async getResult() {
    const result: any = {};

    if (typeof this.query.with_filter != 'undefined') {
      if (this.query.with_filter == true) {
        const filter = this.filter(this.query);
        if (Object.keys(filter).length > 0) {
          result.where = filter;
        }

        const filterDateRange = this.filterDateRange(this.query);
        if (Object.keys(filterDateRange).length > 0) {
          result.where !== undefined
            ? Object.assign(result.where, filterDateRange)
            : (result.where = filterDateRange);
        }

        const filterRange = this.filterRange(this.query);
        if (Object.keys(filterRange).length > 0) {
          result.where !== undefined
            ? Object.assign(result.where, filterRange)
            : (result.where = filterRange);
        }
      }
    }

    if (typeof this.condition !== 'undefined') {
      result.where !== undefined
        ? Object.assign(result.where, this.condition)
        : (result.where = this.condition);
    }

    const order = this.orderBy(this.query);
    if (Object.keys(order).length > 0) {
      result.order = order;
    }

    if (typeof this.query.q !== 'undefined') {
      const search = this.search(this.query);
      result.where = { ...result.where, ...search };
    }

    if (typeof this.extraOptions !== 'undefined') {
      if (typeof this.extraOptions.where !== 'undefined') {
        result.where = { ...result.where, ...this.extraOptions.where };

        // to avoid conflict on query
        delete this.extraOptions.where;
      }
    }

    let data: any;
    let count = 0;

    if ('where' in result) {
      const res = await this.findWithFilter(result);
      data = res.data;
      count = res.count;
    } else {
      const res = await this.findWithoutFilter(result);
      data = res.data;
      count = res.count;
    }

    return {
      count: count,
      data: data,
    };
  }

  private async findWithFilter(filter) {
    const { offset, limit } = this.paginate(this.query);
    const result = await this.model.findAll({
      ...filter,
      include: this.relation,
      attributes: {
        include: [...this.customField],
      },
      group: [...this.groupByField],
      subQuery: false,
      ...this.extraOptions,
    });

    const count = result.length;
    let data = result.slice(offset, offset + limit);
    data = data.map((value) => value.get({ plain: true }));

    return { count, data };
  }

  private async findWithoutFilter(options) {
    try {
      const paginate = this.paginate(this.query);

      const data = this.model
        .findAll({
          ...options,
          include: this.relation,
          offset: paginate.offset,
          limit: paginate.limit,
          attributes: {
            include: [...this.customField],
          },
          group: [...this.groupByField],
          subQuery: true,
          ...this.extraOptions,
        })
        .then((data) => {
          if (data) {
            data = data.map((value) => value.get({ plain: true }));
          }

          return data;
        });

      let countColumn = 'id';

      if (typeof this.relation === 'undefined') {
        countColumn = `${this.model.name}.id`;
      }

      const count = this.model
        .count({
          distinct: true,
          include: this.relation,
          col: countColumn,
        })
        .then((count) => count);

      return {
        count: await Promise.resolve(count),
        data: await Promise.resolve(data),
      };
    } catch (error) {
      console.log(error);
    }
  }

  public load(...relations) {
    this.relation = this.buildMixerEagerLoad(relations);
    return this;
  }

  private buildMixerEagerLoad(relations: (string | Includeable)[]) {
    return relations.map((relation) => {
      if (typeof relation === 'string') {
        return { association: relation };
      }
      return relation;
    });
  }

  public paginate(query) {
    const paginateAttributes = ['limit', 'page'];
    const getPaginate = Object.fromEntries(
      Object.entries(query).filter(([key]) => {
        return paginateAttributes.includes(key);
      }),
    );

    const itemPerPage = +getPaginate.limit || 20; // Default 20 item per page
    const rawCurrentPage = +getPaginate.page || 1; // Default page 1

    const currentPage = itemPerPage * (rawCurrentPage - 1);
    const paginate = {
      offset: currentPage,
      limit: itemPerPage,
    };

    return paginate;
  }

  public sum(field, alias = null) {
    if (!alias) {
      alias = 'sum_' + field.split('.').pop();
    }
    this.customField.push([sequelize.fn('sum', sequelize.col(field)), alias]);

    return this;
  }

  public where(condition: object) {
    this.condition = condition;
    return this;
  }

  public groupBy(field) {
    this.groupByField.push(field);
    return this;
  }

  public generateRawFilter(query) {
    const result: any = {};
    if (typeof this.query.with_filter != 'undefined') {
      if (this.query.with_filter == true) {
        const filter = this.filter(this.query);
        if (Object.keys(filter).length > 0) {
          result.where = filter;
        }

        const filterDateRange = this.filterDateRange(this.query);
        if (Object.keys(filterDateRange).length > 0) {
          result.where !== undefined
            ? Object.assign(result.where, filterDateRange)
            : (result.where = filterDateRange);
        }

        const filterRange = this.filterRange(this.query);
        if (Object.keys(filterRange).length > 0) {
          result.where !== undefined
            ? Object.assign(result.where, filterRange)
            : (result.where = filterRange);
        }
      }
    }

    if (typeof this.condition !== 'undefined') {
      result.where !== undefined
        ? Object.assign(result.where, this.condition)
        : (result.where = this.condition);
    }

    if (typeof this.query.q !== 'undefined') {
      const search = this.search(this.query);
      result.where = { ...result.where, ...search };
    }

    if (typeof this.extraOptions !== 'undefined') {
      if (typeof this.extraOptions.where !== 'undefined') {
        result.where = { ...result.where, ...this.extraOptions.where };

        // to avoid conflict on query
        delete this.extraOptions.where;
      }
    }

    return result.where;
  }

  private filter(query: object) {
    const unfilterable = [
      'order_by',
      'direction',
      'page',
      'limit',
      'filter_date_start',
      'filter_date_end',
      'filter_date_field',
      'filter_range_start',
      'filter_range_end',
      'filter_range_field',
      'q',
      'with_filter',
    ];
    const filter = {};
    Object.entries(query).forEach((value) => {
      if (unfilterable.includes(value[0])) {
        return;
      }
      const key = '$' + value[0].replace(/-/g, '.') + '$';
      filter[key] = value[1] || null;
    });

    return filter;
  }

  private filterDateRange(query: any) {
    const filterable = [
      'filter_date_start',
      'filter_date_end',
      'filter_date_field',
    ];

    const filter = {};
    for (let index = 0; index < query.filter_date_field?.length || 0; index++) {
      const validateFields = filterable.every((value) => {
        return query[value] && query[value][index];
      });

      if (validateFields) {
        const key =
          '$' + query.filter_date_field[index].replace(/-/g, '.') + '$';
        Object.assign(filter, {
          [key]: {
            [Op.gte]: new Date(query.filter_date_start[index]),
            [Op.lte]: new Date(query.filter_date_end[index]),
          },
        });
      }
    }
    return filter;
  }

  private filterRange(query: any) {
    const filterable = [
      'filter_range_start',
      'filter_range_end',
      'filter_range_field',
    ];
    const filter = {};
    for (
      let index = 0;
      index < query.filter_range_field?.length || 0;
      index++
    ) {
      const validateFields = filterable.every((value) => {
        return query[value] && query[value][index];
      });

      if (validateFields) {
        const key =
          '$' + query.filter_range_field[index].replace(/-/g, '.') + '$';
        Object.assign(filter, {
          [key]: {
            [Op.gte]: +query.filter_range_start[index],
            [Op.lte]: +query.filter_range_end[index],
          },
        });
      }
    }
    return filter;
  }

  private search(query: object) {
    const getSearch = Object.fromEntries(
      Object.entries(query).filter(([key]) => {
        return key == 'q';
      }),
    );

    // get model attributes
    const attributes =
      this.model.searchable ||
      Object.keys(this.model.tableAttributes).map(
        (value) => this.model.tableName + '.' + value,
      );

    const result = {};

    attributes.forEach((value) => {
      result['$' + value + '$'] = { [Op.like]: '%' + getSearch.q + '%' };
    });

    return { [Op.or]: result };
  }

  private orderBy(query) {
    const orderStrict = ['order_by', 'direction'];
    const order = Object.fromEntries(
      Object.entries(query).filter(([key]) => {
        return orderStrict.includes(key);
      }),
    );

    if (Object.keys(order).length > 0) {
      const field = order.order_by as string;
      return [[...field.split('-'), order.direction || 'ASC']];
    }

    return [];
  }

  protected buildEagerLoad(relations) {
    const result = [];
    relations.forEach((value) => {
      const relation = value.split('.');
      result.push(this.buildAssociation(relation));
    });

    return result;
  }

  protected buildAssociation(relation: Array<any>) {
    if (relation.length > 1) {
      const associationName = relation[0];
      relation.shift();
      const filterJoinOn = this.join.filter((value) => {
        return value.field == associationName;
      });

      let isRequired = false;
      if (typeof this.query['get_' + associationName] !== 'undefined') {
        isRequired = true;
      }

      return {
        required: isRequired,
        association: associationName,
        include: [this.buildAssociation(relation)],
        ...filterJoinOn[0],
      };
    } else {
      let isRequired = false;
      if (typeof this.query['get_' + relation[0]] !== 'undefined') {
        isRequired = true;
      }

      return {
        required: isRequired,
        association: relation[0],
      };
    }
  }

  public joinOn(association: string, on: Array<any>) {
    const data = { on: {}, field: {} };
    data.field = association;
    for (let index = 0; index < on.length; index++) {
      data.on['col' + index] = sequelize.where(
        on[index][0],
        on[index][1],
        on[index][2],
      );
    }
    this.join.push(data);
    return this;
  }

  public options(options) {
    this.extraOptions = options;
    return this;
  }
}
