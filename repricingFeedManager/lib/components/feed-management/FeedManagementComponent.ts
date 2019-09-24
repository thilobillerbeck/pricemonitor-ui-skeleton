import * as angular from 'angular';
import './feed-management.less';
import {RepricingFeedService} from "../../services/repricingfeed.service";

export class FeedManagementController implements angular.IController {
  // angular injection
  static $inject: string[] = ['RepricingFeedService'];

  // component wide variables
  public feeds: any[];
  public selectedFeed: number;

  private contractorID = "b1d5781111d84f7b3fe45a0852e59758cd7a87e5"; // mock value

  /**
   * Load new dataset into component when selected feed in the
   * sidebar changes
   * @param id Position of the feed which is selected in the sidebar
   */
  public changeDataset(id:number) {
    this.selectedFeed = id;
  }

  /**
   * Move the field to the right in the fields array
   * @param feedId feedId UI-Identifier for Feed
   * @param columnId position in the feeds array (table column)
   */
  public tableMoveRight(feedId:number, columnId:number) {
    let temp = this.feeds[feedId].fields[columnId]
    this.feeds[feedId].fields[columnId] = this.feeds[feedId].fields[columnId + 1]
    this.feeds[feedId].fields[columnId + 1] = temp
  }

  /**
   * Move the field to the left in the fields array
   * @param feedId feedId UI-Identifier for Feed
   * @param columnId position in the feeds array (table column)
   */
  public tableMoveLeft(feedId:number, columnId:number) {
    let temp = this.feeds[feedId].fields[columnId]
    this.feeds[feedId].fields[columnId] = this.feeds[feedId].fields[columnId - 1]
    this.feeds[feedId].fields[columnId - 1] = temp
  }

  /**
   * Delete the field from the fields array in frontend
   * @param feedId feedId UI-Identifier for Feed
   * @param columnId position in the feeds array (table column)
   */
  public tableDelete(feedId:number, columnId:number) {
    this.feeds[feedId].fields.splice(columnId, 1)
  }

  /**
   * Send (changed) service from frontend to API
   * @param feedId UI-Identifier for Feed
   */
  public saveFeed(feedId:number) {
    if(this.validateFeed(feedId)) {
      this.repricingFeedService.setFeed(this.feeds[feedId].contractId, this.feeds[feedId].id, this.feeds[feedId])
          .then((res) => console.log(res))
    } else {
      console.log("Feed invalid!")
    }
  }

  /**
   * Get feeds from API
   */
  public getFeeds() {
    this.repricingFeedService.getFeeds().then((res) => {
      this.feeds = res;
    });
  }

  /**
   * reload feeds
   */
  public reload() {
    console.log("RELOAD")
    this.getFeeds();
  }

  /**
   * Delete a feed from API
   * @param feedId frontend ID of feed
   */
  public deleteFeed(feedId:number) {
    this.repricingFeedService.deleteFeed(this.feeds[feedId].contractId, this.feeds[feedId].id).then((res) => {
      console.log(res)
      this.getFeeds();
    });
  }

  /**
   * Function which validates a given feed before processing
   * @param feedId feed position in the UI
   * @return true when feed is valid
   */
  private validateFeed(feedId:number): boolean {
    return (this.feeds[feedId].name
        && (
            (this.feeds[feedId].csvDecimalSeparator == "." && this.feeds[feedId].csvSeparator != ".")
            || (this.feeds[feedId].csvDecimalSeparator == "," && this.feeds[feedId].csvSeparator != ",")
        ))
  }

  /**
   * Add a feed (currently with hard coded template)
   */
  public addFeed() {
    /* feedSettings is currently a hard coded template, because I don't know how
    feed creation works on the API side */
    this.repricingFeedService.addFeed(this.feeds[0].contractId, {
      "name": "NewService",
      "format": "csv",
      "csvDecimalSeparator": ".",
      "csvSeparator": ",",
      "fields": [],
      "version": 1,
      "id": Math.random().toString(36).substring(7),
      "contractId": Math.random().toString(36).substring(7),
      "url": "",
      "deltaUrl": ""
    }).then((res) => {
      console.log(res)
      this.getFeeds()
    });
  }

  /**
   * helper function to copy a given string to clipboard
   * @param str string to copy
   */
  public copyStringToClipboard(str) {
    const elToCopy = document.createElement('textarea');
    elToCopy.value = str;
    elToCopy.setAttribute('readonly', '');
    document.body.appendChild(elToCopy);
    elToCopy.select();
    document.execCommand('copy');
    document.body.removeChild(elToCopy);
  }

  constructor(
      private repricingFeedService:RepricingFeedService
  ) {
    this.feeds = [];
    this.selectedFeed = 0;
  }

  /**
   * Initialize controller
   */
  $onInit(): void {
    this.getFeeds(); // Get feeds
  }
}

/**
 * Setup Component
 */
export const FeedManagementComponent: angular.IComponentOptions = {
  templateUrl: './feed-management.html',
  controller: FeedManagementController,
  bindings: {}
};
