import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import { Injectable } from '@nestjs/common';
import { genkit } from 'genkit';
import { z } from 'zod';


@Injectable()
export class GenkitService {



    private ai = genkit({
        plugins: [googleAI()],
        model: gemini20Flash
    })

    async generateActionableSteps(note: string) {
        return (await this.ai.generate({
            prompt: `${note}
            
            The above is a doctor's note. I need you to generate actionable steps from the note, based on the schema provided.
            For clarification, checklists are immediate one-time tasks (e.g. buy a drug). And plans are schedules of actions (e.g. daily reminders to take the drug for 7 days).
            Make sure every single day is listed out. Make sure specific times are set
            `,
            output: { schema: AIResponseSchema }
        })).text
    }
}



 const AIResponseSchema = z.object({
    checklist: z.array(z.string()),  // Ensures 'checklist' is an array of strings
    plans: z.array(z.object({
        action: z.string(),
        schedule: z.array(z.object({
            dayOfWeek: z.string(),
            timeOfDay: z.string()
        }))
    })),      // Ensures 'plans' is an array of strings
});
