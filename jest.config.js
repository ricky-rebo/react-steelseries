module.exports = {
	setupFiles: [
		'jest-canvas-mock',
	],
	coverageDirectory: "reports/coverage",
	coverageReporters: ["lcov", "json"]
}