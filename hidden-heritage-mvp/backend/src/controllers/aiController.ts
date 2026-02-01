import { Request, Response } from 'express';
import { StoryModel } from '../models/Story';

export const getAiStory = async (req: Request, res: Response) => {
    try {
        const { siteName, persona, slug } = req.body;

        // If we have a DB-backed story for this slug + persona, return it
        if (slug) {
            const dbStory = await StoryModel.findOne({ site_slug: slug, mode: persona || 'Tourist' });
            if (dbStory) {
                return res.json({
                    site: siteName,
                    persona: persona,
                    content: dbStory.sections[0].content, // For backward compatibility with basic UI
                    formatted_sections: dbStory.sections, // New rich format
                    source: "Hidden Heritage Verified Archives",
                    suggested_followup: "Show me related sites."
                });
            }
        }

        // Fallback Mock Logic (Previous Stub)
        // ... (Keeping the old mock logic as fallback if DB empty)
        const generateStory = (siteName: string, persona: string) => {
            const templates: Record<string, string[]> = {
                Tourist: [`Imagine standing at ${siteName}... a place frozen in time.`],
                Student: [`${siteName} exemplifies the architectural style of...`],
                Researcher: [`Analysis of ${siteName} suggests dates ranging from...`]
            };
            const options = templates[persona] || templates['Tourist'];
            return options[0];
        };

        const storyContent = generateStory(siteName, persona || 'Tourist');

        res.json({
            site: siteName,
            persona,
            content: storyContent + " [Generated Sandbox Mode]",
            suggested_followup: "Consult the archives for more."
        });

    } catch (error) {
        res.status(500).json({ message: 'Error generating story', error });
    }
};
