/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = nextConfig;
