
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class User {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
    email: string;
}

export class JWT {
    jwt: string;
}

export abstract class IQuery {
    abstract jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract register(firstName: string, lastName: string, password: string, email: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
