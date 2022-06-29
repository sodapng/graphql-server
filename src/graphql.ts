
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class InputMember {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<string>;
}

export class Band {
    _id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<string>;
}

export class Bands {
    items?: Nullable<Nullable<Band>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class Member {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<string>;
}

export abstract class IQuery {
    abstract bands(): Bands | Promise<Bands>;

    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract genres(): Nullable<Genres> | Promise<Nullable<Genres>>;

    abstract genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createBand(name: string, origin?: Nullable<string>, members?: Nullable<Nullable<InputMember>[]>, website?: Nullable<string>, genresIds?: Nullable<Nullable<string>[]>): Band | Promise<Band>;

    abstract updateBand(id: string, name?: Nullable<string>, origin?: Nullable<string>, members?: Nullable<Nullable<InputMember>[]>, website?: Nullable<string>, genresIds?: Nullable<Nullable<string>[]>): Band | Promise<Band>;

    abstract deleteBand(id: string): Nullable<DEL> | Promise<Nullable<DEL>>;

    abstract createGenre(name: string, description: string, country: string, year: number): Genre | Promise<Genre>;

    abstract updateGenre(id: string, name?: Nullable<string>, description?: Nullable<string>, country?: Nullable<string>, year?: Nullable<number>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract deleteGenre(id: string): Nullable<DEL> | Promise<Nullable<DEL>>;

    abstract register(firstName: string, lastName: string, password: string, email: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Genre {
    _id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class Genres {
    items?: Nullable<Nullable<Genre>[]>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    total?: Nullable<number>;
}

export class DEL {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

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

type Nullable<T> = T | null;
