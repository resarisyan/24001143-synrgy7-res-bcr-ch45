import { Model } from 'objection';
import { PaginatedData } from '../dto/response/page-response';

export async function paginate<Model>(
  model: typeof Model,
  page: number,
  perPage: number
): Promise<PaginatedData<Model>> {
  const offset = (page - 1) * perPage;
  const totalCountQuery = model.query().resultSize();
  const dataQuery = model.query().offset(offset).limit(perPage);
  const [total, data] = await Promise.all([totalCountQuery, dataQuery]);
  const totalPages = Math.ceil(total / perPage);
  return {
    data: data as Model[],
    total,
    totalPages,
    currentPage: page,
  };
}
