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

    // Weekly Newsletter: Sunday at 9:00 AM (0 9 * * 0)
    cron.schedule('0 9 * * 0', () => {
        console.log('Starting automated Weekly Newsletter job...');
        import('child_process').then(({ exec }) => {
            exec('node scripts/send-weekly-newsletter.js', (error, stdout, stderr) => {
                if (error) {
                    console.error('Weekly Newsletter Job Error:', error);
                    return;
                }
                if (stderr) console.error('Weekly Newsletter Job Stderr:', stderr);
                console.log('Weekly Newsletter Job Output:', stdout);
            });
        });
    });
    
    console.log('Schedules set for Health, Fitness, Nutrition, Wellness, and Weekly Newsletter.');
}
