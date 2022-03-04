require("env-yaml").config({ path: "./.env.yaml" });
const { findOptimalPath } = require("./findOptimalPath");
const { pendingOrdersWithVersion } = require("./pendingOrders");

exports.findPath = (req, res) => {
  const cors = require("cors")();

  cors(req, res, () => {
    findPath(req, res);
  });
};

exports.pendingOrders = (req, res) => {
  const cors = require("cors")();

  cors(req, res, () => {
    pendingOrders(req, res);
  });
};

exports.pendingOrdersV2 = (req, res) => {
  const cors = require("cors")();

  cors(req, res, () => {
    pendingOrdersV2(req, res);
  });
};

const findPath = async (req, res) => {
  const { fromToken, toToken, amountIn } = req.body;
  const foundPath = await findOptimalPath(fromToken, toToken, amountIn);
  res.send(foundPath);
};

const pendingOrders = async (req, res) => {
  const { offset, limit, filter = {} } = req.body;
  const result = await pendingOrdersWithVersion(offset, limit, filter, 1);
  res.send(result);
};

const pendingOrdersV2 = async (req, res) => {
  const { offset, limit, filter = {} } = req.body;
  const result = await pendingOrdersWithVersion(offset, limit, filter, 2);
  res.send(result);
};
