import * as angular from 'angular';

// NOTE: These interfaces would be defined in `pricemonitor-share`!
// We only have these types defined here since we do not want to have dummy interfaces in pricemonitor-share.
export interface Feed {
  id: number;
}

export interface IFeedService {
  getFeeds(): Promise<Feed[]>;
}

// Mock
export class FeedService implements IFeedService {
  static $inject: string[] = ['$q'];

  constructor(private $q: any) {
  }

  getFeeds(): Promise<Feed[]> {
    return this.$q.resolve([{
      id: 1
    }]);
  }
}

angular
  .module('pricemonitor.services', [])
  .service('FeedService', FeedService);
