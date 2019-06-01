import * as angular from 'angular';
import {SkeletonComponent} from './skeleton/SkeletonComponent';

angular
  .module('pricemonitor.skeleton.components', ['pricemonitor.services'])
  .component('skeletonComponent', SkeletonComponent);
