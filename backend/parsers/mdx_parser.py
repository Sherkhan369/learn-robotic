import re
from typing import List, Dict, Any
import markdown
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)


class MDXParser:
    """
    Parser for MDX files to extract clean text content
    MDX files contain JSX components mixed with Markdown
    """

    def __init__(self):
        pass

    def extract_text_from_mdx(self, mdx_content: str) -> str:
        """
        Extract clean text from MDX content by removing JSX components
        and processing Markdown
        """
        try:
            # Remove JSX components (everything between < > tags)
            # This regex handles self-closing tags and nested tags
            text_only = re.sub(r'<[^>]*>', '', mdx_content)

            # Remove code blocks and inline code
            text_only = re.sub(r'```[\s\S]*?```', '', text_only)  # Code blocks
            text_only = re.sub(r'`[^`]*`', '', text_only)  # Inline code

            # Remove comments
            text_only = re.sub(r'<!--[\s\S]*?-->', '', text_only)

            # Convert markdown to plain text
            html = markdown.markdown(text_only)

            # Parse HTML and extract text
            soup = BeautifulSoup(html, 'html.parser')
            clean_text = soup.get_text(separator=' ', strip=True)

            # Clean up extra whitespace
            clean_text = re.sub(r'\s+', ' ', clean_text).strip()

            return clean_text

        except Exception as e:
            logger.error(f"Error extracting text from MDX: {e}")
            return ""

    def extract_text_from_file(self, file_path: str) -> str:
        """
        Extract text from an MDX file
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return self.extract_text_from_mdx(content)
        except Exception as e:
            logger.error(f"Error reading MDX file {file_path}: {e}")
            return ""

    def parse_directory(self, directory_path: str) -> List[Dict[str, Any]]:
        """
        Parse all MDX files in a directory and return their content
        """
        import os
        from pathlib import Path

        results = []

        for root, dirs, files in os.walk(directory_path):
            for file in files:
                if file.lower().endswith('.mdx'):
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, directory_path)

                    content = self.extract_text_from_file(file_path)

                    if content:  # Only add if content was extracted successfully
                        results.append({
                            'file_path': file_path,
                            'relative_path': relative_path,
                            'content': content,
                            'title': self._extract_title(content, file)
                        })

        return results

    def _extract_title(self, content: str, filename: str) -> str:
        """
        Extract title from content or filename
        """
        # Try to extract title from the first heading
        lines = content.split('\n')
        for line in lines[:10]:  # Check first 10 lines
            if line.strip().startswith('# '):
                return line.strip()[2:]  # Remove '# ' prefix

        # If no heading found, use filename
        return filename.replace('.mdx', '').replace('_', ' ').replace('-', ' ').title()


# Global instance
mdx_parser = MDXParser()