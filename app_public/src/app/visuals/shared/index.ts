export * from './node-visual/node-visual.component';
export * from './link-visual/link-visual.component';
export * from './area-visual/area-visual.component';

import { NodeVisualComponent } from './node-visual/node-visual.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import { AreaVisualComponent } from './area-visual/area-visual.component';

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent,
    AreaVisualComponent
];
