import { Model } from 'objection';
import { z } from 'zod';

interface IdCheckOptions {
  tableName: string;
  idColumnName: string;
}

const IdExistsValidator = (options: IdCheckOptions) => (id: number) => {
  return Model.knex()
    .from(options.tableName)
    .where(options.idColumnName, id)
    .first()
    .then((exists) => {
      console.log('ID exists:', exists !== undefined);
      return exists !== undefined;
    })
    .catch((error) => {
      console.error('Error while checking ID existence:', error);
      return false;
    });
};
export const IdExists = (options: IdCheckOptions) =>
  z.string().refine(
    (value) => {
      const exists = IdExistsValidator(options)(parseFloat(value));
      return exists;
    },
    { message: `${options.idColumnName} does not exist` }
  );
