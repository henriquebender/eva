import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/e2e',fullyParallel:false,workers:1,
 use:{baseURL:'http://127.0.0.1:4173/eva/',trace:'retain-on-failure'},
 webServer:{command:process.env.EVA_TEST_PREVIEW==='1'?'npm run preview -- --port 4173 --strictPort':'npm run dev -- --port 4173 --strictPort',url:'http://127.0.0.1:4173/eva/',reuseExistingServer:false,timeout:60000},
 projects:[{name:'tablet',use:{...devices['iPad Mini'],browserName:'chromium'}},{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}]
});