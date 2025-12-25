import tiktoken
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class ChunkingService:
    """
    Service for chunking text content into smaller pieces for vector storage
    Uses token-based chunking with overlap to maintain context
    """

    def __init__(self, max_tokens: int = 512, overlap_tokens: int = 100):
        self.max_tokens = max_tokens
        self.overlap_tokens = overlap_tokens
        # Use a common tokenizer - you can adjust based on your embedding model
        self.tokenizer = tiktoken.encoding_for_model("gpt-3.5-turbo")

    def chunk_text(self, text: str, source_info: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """
        Chunk text into pieces with token-based limits and overlap
        """
        if not text:
            return []

        # Split text into sentences to maintain semantic boundaries
        sentences = self._split_into_sentences(text)

        # Convert sentences to tokens
        sentence_tokens = [self.tokenizer.encode(sentence) for sentence in sentences]

        chunks = []
        current_chunk_tokens = []
        current_chunk_text = ""
        chunk_id = 0

        i = 0
        while i < len(sentence_tokens):
            sentence_token_count = len(sentence_tokens[i])

            # If adding this sentence would exceed the limit
            if len(current_chunk_tokens) + sentence_token_count > self.max_tokens:
                # If current chunk is empty, add the sentence anyway (it's too long to split)
                if len(current_chunk_tokens) == 0:
                    sentence_text = sentences[i]
                    chunks.append({
                        'id': f"{source_info.get('file_path', 'unknown')}_{chunk_id}",
                        'content': sentence_text,
                        'metadata': {**source_info, 'chunk_id': chunk_id} if source_info else {'chunk_id': chunk_id},
                        'token_count': sentence_token_count
                    })
                    chunk_id += 1
                    i += 1
                    continue

                # Save current chunk
                chunk_text = self.tokenizer.decode(current_chunk_tokens)
                chunks.append({
                    'id': f"{source_info.get('file_path', 'unknown')}_{chunk_id}",
                    'content': chunk_text,
                    'metadata': {**source_info, 'chunk_id': chunk_id} if source_info else {'chunk_id': chunk_id},
                    'token_count': len(current_chunk_tokens)
                })
                chunk_id += 1

                # Start new chunk with overlap
                if self.overlap_tokens > 0:
                    # Calculate how many tokens to keep for overlap
                    overlap_start_idx = max(0, len(current_chunk_tokens) - self.overlap_tokens)
                    current_chunk_tokens = current_chunk_tokens[overlap_start_idx:]
                    # Recreate text with overlapping tokens
                    current_chunk_text = self.tokenizer.decode(current_chunk_tokens)
                else:
                    current_chunk_tokens = []
                    current_chunk_text = ""
            else:
                # Add sentence to current chunk
                current_chunk_tokens.extend(sentence_tokens[i])
                current_chunk_text += sentences[i]
                i += 1

        # Add the last chunk if it has content
        if current_chunk_tokens:
            chunks.append({
                'id': f"{source_info.get('file_path', 'unknown')}_{chunk_id}",
                'content': self.tokenizer.decode(current_chunk_tokens),
                'metadata': {**source_info, 'chunk_id': chunk_id} if source_info else {'chunk_id': chunk_id},
                'token_count': len(current_chunk_tokens)
            })

        logger.info(f"Chunked text into {len(chunks)} chunks")
        return chunks

    def _split_into_sentences(self, text: str) -> List[str]:
        """
        Split text into sentences using regex
        """
        # This is a simple sentence splitter - you might want to use a more sophisticated NLP library
        import re

        # Split on sentence endings followed by whitespace and capital letter
        sentences = re.split(r'(?<=[.!?])\s+', text)

        # Clean up sentences
        sentences = [s.strip() for s in sentences if s.strip()]

        return sentences


# Global instance
chunking_service = ChunkingService()