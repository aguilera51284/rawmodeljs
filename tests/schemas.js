import test from 'ava';
import {Schema} from '../dist/index';

test('can be extended through mixins', async (t) => {
  let animalSchema = new Schema({
    fields: () => ({
      kind: {
        type: 'String'
      },
      relatives: {
        type: [animalSchema]
      }
    }),
    strict: true,
    validators: {
      foo: 'foo'
    },
    types: {
      foo: 'foo'
    },
    firstErrorOnly: true
  });
  let dogSchema = new Schema({
    mixins: [
      animalSchema
    ],
    fields: () => ({
      name: {
        type: 'String'
      }
    }),
    strict: false,
    validators: {
      bar: 'bar'
    },
    types: {
      bar: 'bar'
    },
    firstErrorOnly: false
  });
  let catSchema = new Schema({
    mixins: [
      dogSchema
    ],
    fields: () => ({
      dislikes: {
        type: [dogSchema]
      }
    }),
    validators: {
      baz: 'baz'
    },
    types: {
      baz: 'baz'
    }
  });

  let keys = [];
  // fields
  keys = Object.keys(catSchema.fields) // cats
  t.deepEqual(keys, ['kind', 'relatives', 'name', 'dislikes']);
  keys = Object.keys(catSchema.fields.dislikes.type[0].fields)
  t.deepEqual(keys, ['kind', 'relatives', 'name']); // dogs
  keys = Object.keys(catSchema.fields.dislikes.type[0].fields.relatives.type[0].fields)
  t.deepEqual(keys, ['kind', 'relatives']); // animals
  // strict
  t.is(dogSchema.strict, false);
  t.is(catSchema.strict, false);
  // validators
  keys = Object.keys(catSchema.validators)
  t.deepEqual(keys, ['foo', 'bar', 'baz']);
  // types
  keys = Object.keys(catSchema.types)
  t.deepEqual(keys, ['foo', 'bar', 'baz']);
  // firstErrorOnly
  t.is(dogSchema.firstErrorOnly, false);
  t.is(catSchema.firstErrorOnly, false);
});
