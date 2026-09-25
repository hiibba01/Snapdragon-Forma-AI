export const extractClaimData = async (story, fields) => {
    const response = await fetch("http://127.0.0.1:8001/extract", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            story,
            fields
        })
    });

    if (!response.ok) {
        throw new Error(
            `Edge AI service returned ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error("Edge AI extraction failed");
    }

    return result.data;
};


export const generateClaimSummary = async (
    story,
    extractedData
) => {

    const response = await fetch(
        "http://127.0.0.1:8001/summarize",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                story,
                extracted_data: extractedData
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Edge AI summary service returned ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message || "Edge AI summary generation failed"
        );
    }

    return result.summary;
};


export const checkClaimConsistency = async (
    story,
    extractedData
) => {

    const response = await fetch(
        "http://127.0.0.1:8001/consistency",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                story,
                extracted_data: extractedData
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Edge AI consistency service returned ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message ||
            "Edge AI consistency check failed"
        );
    }

    return {
        consistent: result.consistent,
        issues: result.issues || []
    };
};