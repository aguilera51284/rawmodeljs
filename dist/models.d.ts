import { ValidatorRecipe } from 'validatable';
import { HandlerRecipe } from 'handleable';
import { Field, FieldRecipe, FieldError } from './fields';
export interface FieldRef {
    path: string[];
    field: Field;
}
export interface FieldErrorRef extends Error {
    path: string[];
    errors: FieldError[];
}
export interface ModelOptions {
    parent?: Model;
    context?: Model;
}
export declare abstract class Model {
    protected _fields: {
        [name: string]: Field;
    };
    protected _types: {
        [key: string]: (v?) => any;
    };
    protected _validators: {
        [key: string]: (v?, r?: ValidatorRecipe) => boolean | Promise<boolean>;
    };
    protected _handlers: {
        [key: string]: (v?, r?: HandlerRecipe) => boolean | Promise<boolean>;
    };
    protected _failFast: boolean;
    readonly root: Model;
    parent: Model;
    context: Model;
    static context: Model;
    constructor(data?: {}, options?: ModelOptions);
    protected _getRootModel(): Model;
    protected _createField(recipe?: FieldRecipe): Field;
    protected _createValidationError(message?: string, code?: number): FieldError;
    protected _createModel(data?: {}, options?: ModelOptions): any;
    failFast(fail?: boolean): void;
    defineField(name: string, recipe?: FieldRecipe): void;
    defineType(name: string, converter: (v?) => any): void;
    defineValidator(name: string, handler: (v?, r?: ValidatorRecipe) => boolean | Promise<boolean>): void;
    defineHandler(name: string, handler: (e?, r?: HandlerRecipe) => boolean | Promise<boolean>): void;
    defineModel(name: string, Klass: typeof Model): void;
    getField(...keys: any[]): Field;
    hasField(...keys: any[]): boolean;
    populate(data?: {}): this;
    serialize(): {};
    flatten(prefix?: string[]): FieldRef[];
    collect(handler: (field: FieldRef) => any): any[];
    scroll(handler: (field: FieldRef) => void): number;
    filter(test: (field: FieldRef) => boolean): {};
    reset(): this;
    fake(): this;
    clear(): this;
    commit(): this;
    rollback(): this;
    equals(value: any): boolean;
    isChanged(): boolean;
    isNested(): boolean;
    validate({quiet}?: {
        quiet?: boolean;
    }): Promise<this>;
    handle(error: any, {quiet}?: {
        quiet?: boolean;
    }): Promise<this>;
    collectErrors(): FieldErrorRef[];
    applyErrors(errors?: FieldErrorRef[]): this;
    hasErrors(): boolean;
    isValid(): boolean;
    invalidate(): this;
    clone(): this;
}
