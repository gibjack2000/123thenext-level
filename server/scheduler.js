import cron from 'node-cron';
import { processCategoryJob } from './blog-generator.js';

export function initScheduler() {
    console.log('Initializing Blog Automation Scheduler...');

    // Health: 00:00, 12:00
    cron.schedule('0 0,12 * * *', () => {
        processCategoryJob('Health');
    });

    // Fitness: 00:15, 12:15
    cron.schedule('15 0,12 * * *', () => {
        processCategoryJob('Fitness');
    });

    // Nutrition: 00:30, 12:30
    cron.schedule('30 0,12 * * *', () => {
        processCategoryJob('Nutrition');
    });

    // Wellness: 00:45, 12:45
    cron.schedule('45 0,12 * * *', () => {
        processCategoryJob('Wellness');
    });
    
    console.log('Schedules set for Health, Fitness, Nutrition, and Wellness.');
}
