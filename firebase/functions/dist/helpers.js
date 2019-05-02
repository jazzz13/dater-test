"use strict";

class ArgumentError extends Error {}

exports.checkTypeParam = (value, type, name) => {
  if (!value || typeof value !== type) {
    // eslint-disable-line valid-typeof
    throw new ArgumentError(`Param "${name}" is not ${type}`);
  }

  if (type === 'string' && value.trim().length === 0) {
    throw new ArgumentError(`String "${name}" is empty`);
  }
};

exports.httpMethodsWrap = method => async (req, res) => {
  try {
    await method(req, res);
  } catch (e) {
    if (e instanceof ArgumentError) {
      res.send({
        error: e.message
      }, 400);
    } else {
      console.log('500 error', e.message, req.body);
      res.send({
        error: e.message
      }, 500);
    }
  }
};