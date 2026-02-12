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

        // Fallback Mock Logic (Previous Stub) - Enhanced
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await wait(1500); // Simulate AI processing delay for realism

        const generateStory = (siteName: string, persona: string) => {
            const templates: Record<string, any> = {
                Tourist: {
                    content: `Imagine standing at ${siteName}... the air is thick with history. Every stone here has a story to tell, from ancient battles to serene prayers.`,
                    sections: [
                        { title: "The Legend", content: `Local folklore says that ${siteName} was built by celestial beings in a single night.` },
                        { title: "What to See", content: "Don't miss the intricate carvings on the eastern gate." }
                    ]
                },
                Student: {
                    content: `${siteName} is a prime example of regional architecture, showcasing the transition from early to late medieval styles.`,
                    sections: [
                        { title: "Architectural Features", content: "Note the use of sandstone and the specific geometric patterns unique to this era." },
                        { title: "Historical Context", content: "Built during the reign of the Tomar dynasty, it served as both a strategic point and a religious center." }
                    ]
                },
                Researcher: {
                    content: `Detailed analysis of ${siteName} suggests dates ranging from the 8th to 12th century, with multiple phases of reconstruction evident in the stratigraphy.`,
                    sections: [
                        { title: "Epigraphical Evidence", content: "Inscriptions found on the plinth date back to 1050 AD, referencing King Kirtiraj." },
                        { title: "Conservation Status", content: "The site requires urgent attention regarding water seepage in the northern quadrant." }
                    ]
                }
            };
            const options = templates[persona] || templates['Tourist'];
            return options;
        };

        const storyData = generateStory(siteName, persona || 'Tourist');

        res.json({
            site: siteName,
            persona,
            content: storyData.content + " [AI Generated Preview]",
            formatted_sections: storyData.sections,
            source: "Hidden Heritage AI Engine (Beta)",
            suggested_followup: "Tell me more about the architecture."
        });

    } catch (error) {
        res.status(500).json({ message: 'Error generating story', error });
    }
};
