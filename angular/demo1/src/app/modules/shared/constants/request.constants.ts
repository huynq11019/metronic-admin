import {DocumentSnapshot} from "@angular/fire/firestore";

export interface IBaseRequestModel {
  keyword?: string | null;
  pageIndex?: number | null;
  pageSize?: number | null;
  sortBy?: string | null;
  hasPageable?: boolean | null;
}

export interface IPagination {
  pageIndex?: number | null;
  pageSize?: number | null;
  // total?: number | null;
  startAfter?: DocumentSnapshot<any>
}

export interface ISearch {
  keyword?: string | null;
  sortBy?: string | null;
}

export interface ISearchWithPagination extends ISearch, IPagination {}

export interface ISearchWithPaginationOptionally extends ISearch, IPagination, IBaseRequestModel, IFindByIdsRequest {}

export interface IFindByIdsRequest {
  ids?: string[];
}
