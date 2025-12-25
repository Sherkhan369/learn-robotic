from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class GroundingValidator:
    """
    Service for validating that AI responses are properly grounded in provided context
    """

    def __init__(self):
        pass

    async def validate_response_grounding(
        self,
        response: str,
        context_chunks: List[str],
        threshold: float = 0.7
    ) -> Dict[str, Any]:
        """
        Validate that the response is grounded in the provided context
        """
        try:
            # Check if response content appears to be based on context
            context_keywords = self._extract_keywords_from_context(context_chunks)
            response_keywords = self._extract_keywords_from_response(response)

            # Calculate overlap between response and context keywords
            overlap_score = self._calculate_keyword_overlap(context_keywords, response_keywords)

            # Check for hallucinations by looking for content not in context
            potential_hallucinations = self._identify_potential_hallucinations(response, context_chunks)

            is_valid = overlap_score >= threshold and len(potential_hallucinations) == 0

            return {
                "is_valid": is_valid,
                "overlap_score": overlap_score,
                "threshold": threshold,
                "potential_hallucinations": potential_hallucinations,
                "validation_details": {
                    "context_keywords_count": len(context_keywords),
                    "response_keywords_count": len(response_keywords),
                    "matching_keywords_count": len(set(context_keywords) & set(response_keywords))
                }
            }

        except Exception as e:
            logger.error(f"Error validating response grounding: {e}")
            # In case of error, return a conservative validation result
            return {
                "is_valid": False,
                "overlap_score": 0.0,
                "threshold": threshold,
                "potential_hallucinations": ["Validation error occurred"],
                "validation_details": {}
            }

    def _extract_keywords_from_context(self, context_chunks: List[str]) -> List[str]:
        """
        Extract keywords from context chunks
        """
        all_text = " ".join(context_chunks).lower()
        # Simple keyword extraction - in practice, you might use NLP techniques
        import re
        words = re.findall(r'\b\w+\b', all_text)
        # Filter out common stop words and return unique keywords
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
        }
        keywords = [word for word in words if len(word) > 3 and word not in stop_words]
        return list(set(keywords))  # Return unique keywords

    def _extract_keywords_from_response(self, response: str) -> List[str]:
        """
        Extract keywords from response
        """
        text = response.lower()
        import re
        words = re.findall(r'\b\w+\b', text)
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
        }
        keywords = [word for word in words if len(word) > 3 and word not in stop_words]
        return list(set(keywords))  # Return unique keywords

    def _calculate_keyword_overlap(self, context_keywords: List[str], response_keywords: List[str]) -> float:
        """
        Calculate the overlap between context and response keywords
        """
        if not context_keywords:
            return 0.0

        matching_keywords = set(context_keywords) & set(response_keywords)
        overlap_score = len(matching_keywords) / len(context_keywords)
        return min(overlap_score, 1.0)  # Cap at 1.0

    def _identify_potential_hallucinations(self, response: str, context_chunks: List[str]) -> List[str]:
        """
        Identify potential hallucinations in the response
        """
        potential_hallucinations = []

        # This is a simplified approach - in practice, you might use more sophisticated NLP
        context_text = " ".join(context_chunks).lower()
        response_sentences = response.split('.')

        for sentence in response_sentences:
            sentence = sentence.strip()
            if sentence and len(sentence) > 10:  # Only check meaningful sentences
                sentence_lower = sentence.lower()
                # Check if sentence appears to be in context
                if sentence_lower not in context_text:
                    # This might be a hallucination, but we'll be conservative
                    # and just flag potentially novel information
                    potential_hallucinations.append(sentence)

        return potential_hallucinations


# Global instance
grounding_validator = GroundingValidator()