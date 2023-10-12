import { Lightning } from "@lightningjs/sdk";

Lightning.module('module1', function() {
  return {
    myVariable: 'Hello, World!'
  };
});
