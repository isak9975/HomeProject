package com.korea.homeproject.controller;

import com.google.analytics.data.v1beta.*;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.IOException;

@RestController
public class AnalyticsController {

    private static final String PROPERTY_ID = "497710939"; // GA4 속성 ID 입력
//    private static final String KEY_FILE_PATH = "src/main/resources/service-account.json"; // 서비스 계정 JSON 키 경로
    private static final String KEY_FILE_PATH = "/home/ubuntu/service-account.json";


    @GetMapping("/analytics/visitors")
    public String getVisitors() throws IOException {
        // 인증
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(KEY_FILE_PATH))
                .createScoped("https://www.googleapis.com/auth/analytics.readonly");

        try (BetaAnalyticsDataClient analyticsData = BetaAnalyticsDataClient.create(
                BetaAnalyticsDataSettings.newBuilder()
                        .setCredentialsProvider(() -> credentials)
                        .build())) {

            // 요청 구성
            RunReportRequest request = RunReportRequest.newBuilder()
                    .setProperty("properties/" + PROPERTY_ID)
                    .addDimensions(Dimension.newBuilder().setName("date"))
                    .addMetrics(Metric.newBuilder().setName("activeUsers"))
                    .addDateRanges(DateRange.newBuilder().setStartDate("7daysAgo").setEndDate("today"))
                    .build();

            // API 호출
            RunReportResponse response = analyticsData.runReport(request);

            StringBuilder result = new StringBuilder();
            response.getRowsList().forEach(row ->
                    result.append("날짜: ").append(row.getDimensionValues(0).getValue())
                          .append(", 방문자 수: ").append(row.getMetricValues(0).getValue())
                          .append("\n")
            );

            return result.toString();
        }
    }
}