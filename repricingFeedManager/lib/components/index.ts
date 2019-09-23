import * as angular from 'angular';
import { FeedManagementComponent } from './feed-management/FeedManagementComponent';

angular
    .module('pricemonitor.skeleton.components', ['pricemonitor.services'])
    .component('feedManagementComponent', FeedManagementComponent)