import 'jquery';
import * as angular from 'angular';
import 'pricemonitor-core/dist/theme.css';
import './services';
import '../dist/pricemonitor.skeleton';
import './app.less';

angular
  .module('pricemonitor.skeleton.example', ['pricemonitor.skeleton']);

