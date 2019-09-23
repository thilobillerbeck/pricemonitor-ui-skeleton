import * as angular from 'angular';
import './components/index';
import {RepricingFeedService} from "./services/repricingfeed.service";

angular
    .module('pricemonitor.skeleton', ['pricemonitor.skeleton.components'])
    .factory('RepricingService', RepricingFeedService.Factory)
    .service('RepricingFeedService', RepricingFeedService);