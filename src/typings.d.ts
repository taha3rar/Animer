/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';
declare module 'googlemaps';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
