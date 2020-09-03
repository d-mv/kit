type Maybe<T> = T | undefined;
type Either<T, K> = T | K;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyValue = any;
interface Json<T> {
  default: T;
}

interface Response<T> {
  isOK: boolean;
  message?: string;
  status?: number;
  payload?: T;
}

type PromisedResponse<T = unknown> = Promise<Response<T>>;

type Mapped<T> = Map<string, T>;

// REDUX

type RootState = Mapped<unknown>;
interface AnyAction {
  type: string;
  payload?: AnyValue;
}

type Dispatch<T> = (action: T) => void;
export type Store = {
  getState: () => RootState;
  dispatch: Dispatch<AnyAction> | any;
};

export type {
  Maybe,
  Either,
  AnyValue,
  Mapped,
  Json,
  Response,
  PromisedResponse,
};
