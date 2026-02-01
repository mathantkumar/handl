import { pipeline, env } from '@xenova/transformers';

// Skip local checks, force browser cache
env.allowLocalModels = false;
env.useBrowserCache = true;

class ExtractionHandler {
    static instance = null;

    static async getInstance(progress_callback) {
        if (!this.instance) {
            console.log("Worker: Initializing Pipeline...");
            // LaMini-Flan-T5-77M is smaller and more stable for browser execution
            this.instance = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-77M', {
                quantized: true,
                progress_callback,
            });
            console.log("Worker: Pipeline Initialized");
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { text } = event.data;

    try {
        console.log("Worker: Received text, length:", text.length);
        self.postMessage({ status: 'progress', progress: 0, message: 'Loading extractor model...' });

        const extractor = await ExtractionHandler.getInstance((data) => {
            if (data.status === 'progress') {
                self.postMessage({
                    status: 'progress',
                    progress: data.progress,
                    message: 'Loading AI...'
                });
            }
        });

        self.postMessage({ status: 'progress', progress: 50, message: 'Extracting data...' });

        // The Prompt Engineering part
        const prompt = `Extract the invoice number, date, and total amount from this text in JSON format: ${text}`;

        const output = await extractor(prompt, {
            max_new_tokens: 200,
            do_sample: false, // Greedy search for consistency
            // temperature ignored when do_sample is false
        });

        self.postMessage({ status: 'complete', output: output[0].generated_text });

    } catch (e) {
        console.error(e);
        self.postMessage({ status: 'error', error: e.message });
    }
});
