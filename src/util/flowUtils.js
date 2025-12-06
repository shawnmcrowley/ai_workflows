import fs from 'fs';
import path from 'path';

export function getAvailableFlows() {
  try {
    const flowsDir = path.join(process.cwd(), 'flows');
    const files = fs.readdirSync(flowsDir);
    
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file.replace('.json', ''),
        filename: file,
        path: `/flows/${file}`
      }));
  } catch (error) {
    console.error('Error reading flows directory:', error);
    return [];
  }
}
