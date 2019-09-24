import * as angular from 'angular';
import * as Promise from 'bluebird';
import {IPromise} from "angular";

interface FeedSettings {
    /**
     * Name of the feed
     */
    name: string;
    /**
     * The feed format can either be 'csv' or 'json'.
     */
    format: FeedFormat;
    csvDecimalSeparator?: string;
    csvSeparator?: string;
    fields: FeedField[];
    /**
     * Schema version of this document. Current version is 2.
     */
    version: number;
}

declare enum FeedFormat {
    csv = 'csv',
    json = 'json',
}

interface FeedField {
    /**
     * Name of the column in the resulting csv feed.
     */
    label: string;
    /**
     * Default value for the field in the feed. If the value is set, the name field can't be set.
     */
    default?: string;
    /**
     * Name of the pricemonitor field which contains the value. If it is not set the "default" field must be set.
     * Can be one of:
     * Gtin, ProductIdentifier, ProductName, OldPosition, NewPosition, OldPrice, NewPrice, OldDeliveryCosts, NewDeliveryCosts, ReferencePrice, CheapestCompetitors, Timestamp, tag.*, formula.*, offer.*.
     * - tag.*: * can be an arbitrary name of the tag
     * - formula.*: * is a formula
     * - offer.*: * is offer[<index>].<offer field name> or offer.sortAsc()[<index>].<offer field name> or offer.sortAsc("@.price+@.deliveryCosts")[<index>].<offer field name>
     *              where offer field name is on of vendorName, price, deliveryCosts, minDeliveryTime, maxDeliveryTime and url
     *              and index starts at 0 and defines the offer position
     *
     */
    name?: string;
}

interface Feed extends FeedSettings {
    id: string;
    contractId: string;
    lastAccessed?: Date;
    lastDeletion?: Date;
    /**
     * The url from where the user can download the feed.
     */
    url: string;
    /**
     * The url from where the user can download the feed, but compared to 'url' it will only contain the latest changed.
     */
    deltaUrl: string;
}
interface IRepricingFeedService {

    /**
     * Get all feeds for a contract.
     * @param contractId
     */
    getFeeds(contractId: String): Promise<Feed[]>;

    /**
     * Get a specific feed for a contract.
     * @param contractId
     * @param feedId
     * @returns The feed identified by the feedId. If the feed could not be found the promise will fail.
     */
    getFeed(contractId: String, feedId: String): Promise<Feed>;

    /**
     * Add a new feed for a contract.
     * @param contractId
     * @param feedSettings
     */
    addFeed(contractId: String, feedSettings: FeedSettings): Promise<Feed>;

    /**
     * Update a feed identified by contractId and feedId
     * @param contractId
     * @param feedId
     * @param feedSettings
     */
    setFeed(contractId: String, feedId: String, feedSettings: FeedSettings): Promise<Feed>;

    /**
     * Delete a feed identified by contractId and feedId
     * @param contractId
     * @param feedId
     */
    deleteFeed(contractId: String, feedId: String): Promise<void>;
}

// Mock
export class RepricingFeedService implements IRepricingFeedService {
    static $inject: string[] = ['$http', '$q'];

    constructor(private http: angular.IHttpService) {}

    getFeeds(): Promise<Feed[]> {
        return this.http.get<Feed[]>("http://localhost:3000/feeds/")
            .then(response => response.data)
    }

    addFeed(contractId: String, feedSettings: FeedSettings): Promise<Feed> {
        return this.http.post<Feed>('http://localhost:3000/feeds/', feedSettings)
            .then(response => response.data)
    }

    deleteFeed(contractId: String, feedId: String): Promise<void> {
        return this.http.delete<void>('http://localhost:3000/feeds/' + feedId)
            .then(response => response.data)
    }

    getFeed(contractId: String, feedId: String): Promise<Feed> {
        return this.http.get<Feed>('http://localhost:3000/feeds/' + feedId)
            .then(response => response.data)
    }

    setFeed(contractId: String, feedId: String, feedSettings: FeedSettings): Promise<Feed> {
        return this.http.put<Feed>('http://localhost:3000/feeds/' + feedId, feedSettings)
            .then(response => response.data)
    }

    static Factory(http: angular.IHttpService) {
        return new RepricingFeedService(http);
    }
}

angular
    .module('pricemonitor.services', [])
    .service('pricemonitor-service', RepricingFeedService)