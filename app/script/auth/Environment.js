/*
 * Wire
 * Copyright (C) 2017 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

export const LOCAL = 'LOCAL';
export const STAGING = 'STAGING';
export const PRODUCTION = 'PRODUCTION';

export const APP_ENVIRONMENT = getEnvironmentFromQuery();
checkEnvironment();

export function getURLParameter(parameterName) {
  return (window.location.search.split(`${parameterName}=`)[1] || '').split('&')[0];
}

export function getEnvironmentFromQuery() {
  const isProductionHost = window.location.hostname.includes('wire.com');
  switch (getURLParameter('env')) {
    case 'staging':
      return STAGING;
    case 'prod':
      return PRODUCTION;
    default:
      return isProductionHost ? PRODUCTION : STAGING;
  }
}

export function checkEnvironment() {
  const environment = getEnvironment();
  console.log(`Starting with environment ### ${environment} ###`);
  if (![LOCAL, STAGING, PRODUCTION].includes(environment)) {
    throw new Error(`Invalid environment ${environment}`);
  }
}

export function getEnvironment() {
  return APP_ENVIRONMENT;
}

export function isEnvironment(environment) {
  return APP_ENVIRONMENT === environment;
}

export function onEnvironment(onLocal, onStaging, onProduction) {
  switch (getEnvironment()) {
    case LOCAL: {
      return onLocal;
    }
    case STAGING: {
      return onStaging;
    }
    case PRODUCTION: {
      return onProduction;
    }
    default: {
      return onProduction;
    }
  }
}
