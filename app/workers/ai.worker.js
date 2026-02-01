
import { pipeline, env } from '@xenova/transformers';

// 1. Skip local model checks (we are serverless)
env.allowLocalModels = false;

// 2. FORCE Browser Cache (This fixes the re-download issue)
env.useBrowserCache = true;

// Singleton to hold the model in memory
class AIHandler {
    static instance = null;

    static async getInstance(progress_callback) {
        if (!this.instance) {
            // 3. Use DistilBART (Fast & Light)
            this.instance = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6', {
                quantized: true, // Forces smaller model (~80MB)
                progress_callback,
            });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { text } = event.data;

    try {
        // Report "Starting" status
        self.postMessage({ status: 'progress', progress: 0, message: 'Checking cache...' });

        const summarizer = await AIHandler.getInstance((data) => {
            // Pass download progress back to UI
            if (data.status === 'progress') {
                self.postMessage({
                    status: 'progress',
                    progress: data.progress,
                    message: data.status === 'initiate' ? 'Downloading (First run only)...' : 'Loading model...'
                });
            }
            // If it says 'done', it means it loaded from cache
            if (data.status === 'done') {
                self.postMessage({ status: 'progress', progress: 100, message: 'Model loaded from cache!' });
            }
        });

        self.postMessage({ status: 'progress', progress: 100, message: 'Analyzing text...' });

        // Run the summary
        const output = await summarizer(text, {
            max_new_tokens: 150,
            min_length: 30,
        });

        self.postMessage({ status: 'complete', output: output[0].summary_text });

    } catch (e) {
        console.error(e);
        self.postMessage({ status: 'error', error: e.message });
    }
});
