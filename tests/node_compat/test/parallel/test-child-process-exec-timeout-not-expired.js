// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 18.12.1
// This file is automatically generated by "node/_tools/setup.ts". Do not modify this file manually

// TODO(PolarETech): The process.argv[3] check should be argv[2], and the
// command passed to exec() should not need to include "run", "-A",
// and "runner.ts".

'use strict';

// Test exec() when a timeout is set, but not expired.

const common = require('../common');
const assert = require('assert');
const cp = require('child_process');

const {
  cleanupStaleProcess,
  logAfterTime
} = require('../common/child_process');

const kTimeoutNotSupposedToExpire = 2 ** 30;
const childRunTime = common.platformTimeout(100);

// The time spent in the child should be smaller than the timeout below.
assert(childRunTime < kTimeoutNotSupposedToExpire);

if (process.argv[3] === 'child') {
  logAfterTime(childRunTime);
  return;
}

const cmd = `"${process.execPath}" run -A runner.ts "${__filename}" child`;

cp.exec(cmd, {
  timeout: kTimeoutNotSupposedToExpire
}, common.mustSucceed((stdout, stderr) => {
  assert.strictEqual(stdout.trim(), 'child stdout');
  assert.strictEqual(stderr.trim(), 'child stderr');
}));

cleanupStaleProcess(__filename);