import * as angular from 'angular';
import './skeleton.less';
// NOTE: these would be imported from pricemonitor-share!
import {Feed, IFeedService} from "../../../example/services";


export class SkeletonController implements angular.IController {
  public feeds: Feed[] = [];
  static $inject: string[] = ['FeedService'];

  constructor(private feedService: IFeedService) {

  }

  $onInit(): void {
    this
      .feedService
      .getFeeds()
      .then(feeds => this.feeds = feeds);
  }
}

export const SkeletonComponent: angular.IComponentOptions = {
  templateUrl: './skeleton.html',
  controller: SkeletonController,
  bindings: {}
};

