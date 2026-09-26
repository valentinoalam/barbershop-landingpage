/**
 * A component that renders JSON-LD schema markup
 */
import * as React from 'react';

export function JsonLd<T extends object>({ schema }: { schema: T }) {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  });
}
  
  