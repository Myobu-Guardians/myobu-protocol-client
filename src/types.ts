export type MyobuDBPropValue =
  | string
  | number
  | boolean
  | null
  | MyobuDBPropValue[];

export interface MyobuRecord {
  labels?: string[];
  type?: string;
  props: { [key: string]: MyobuDBPropValue };
}

export interface MyobuDBJWTPayload {
  /**
   * Issuer of the signature. Usually it's the public key of the issuer.
   */
  iss: string;
  /**
   * Expiration time
   */
  exp: number;
  /**
   * The arbitrary data that the issuer wants to include in the JWT.
   */
  msg?: string;
}

export type MyobuDBJWTSignature = string;

export interface MyobuDBJWT {
  payload: MyobuDBJWTPayload;
  signature: MyobuDBJWTSignature;
}

export enum MyobuDBOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface MyobuDBNode {
  key: string;
  labels?: string[];
  props?: { [key: string]: MyobuDBPropValue };
}

export interface MyobuDBRelationship {
  key: string;
  type: string;
  from: MyobuDBNode;
  to: MyobuDBNode;
  props?: { [key: string]: MyobuDBPropValue };
}

export type MyobuDBWhereClauseValue =
  | {
      $gt: MyobuDBPropValue;
    }
  | {
      $gte: MyobuDBPropValue;
    }
  | {
      $lt: MyobuDBPropValue;
    }
  | {
      $lte: MyobuDBPropValue;
    }
  | {
      $ne: MyobuDBPropValue;
    }
  | {
      $eq: MyobuDBPropValue;
    }
  | {
      $in: MyobuDBPropValue[];
    }
  | {
      $nin: MyobuDBPropValue[];
    }
  | {
      $regex: string;
    }
  | {
      $contains: string;
    }
  | {
      $startsWith: string;
    }
  | {
      $endsWith: string;
    };

export type MyobuDBWhereClause = /*
  | {
      $and: MyobuDBWhereClause[];
    }
  | {
      $or: MyobuDBWhereClause[];
    }
  |*/ { [key: string]: MyobuDBWhereClauseValue };

export type MyobuDBRequest = {
  // CRUD
  match?: (MyobuDBNode | MyobuDBRelationship)[];
  create?: (MyobuDBNode | MyobuDBRelationship)[];
  merge?: (MyobuDBNode | MyobuDBRelationship)[];
  delete?: string[];
  set?: {
    [key: string]: any;
  };
  onMatch?: {
    [key: string]: any;
  };
  onCreate?: {
    [key: string]: any;
  };
  where?: MyobuDBWhereClause;
  skip?: number;
  limit?: number;
  orderBy?: {
    [key: string]: MyobuDBOrder;
  };
  return?: string[];

  // Constraints
  /**
   * List constraints of label.
   */
  listConstraints: string;
  /**
   * Drop constraints by constraint names
   */
  dropConstraints: string[];
  /**
   * Create constraints
   */
  createConstraints: {
    label: string;
    unique: string[][];
  };

  // JWT
  jwt?: MyobuDBJWT;
};
