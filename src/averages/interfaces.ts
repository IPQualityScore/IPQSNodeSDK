export interface Averages {
    country?: string,
    start_date?: string,
    end_date?: string,
    transactionID?: string,
    userID?: string,
    subUserId?: string,
    campaignID?: string,
    subCampaignID?: string,
    gclid?: string,
    email?: string,
    clickID?: string,
    conversionID?: string,
}

export interface AveragesResponse {
    [key: string]: never;
}

