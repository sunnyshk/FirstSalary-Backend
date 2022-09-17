const Job = require("../models/job.models");

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const createJob = async (req, res) => {
  // req.body.createdBy = req.user.usedId;
  // const job = await Job.create(req.body);
  // return res.staus(200).send(job);
  const job = await Job.create(req.body);
  console.log(req.body.createdBy)
  return res.status(200).send(job)
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
