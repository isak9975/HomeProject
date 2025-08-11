package com.korea.homeproject.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.analytics.data.v1beta.BetaAnalyticsDataClient;
import com.google.analytics.data.v1beta.BetaAnalyticsDataSettings;
import com.google.analytics.data.v1beta.DateRange;
import com.google.analytics.data.v1beta.Dimension;
import com.google.analytics.data.v1beta.Metric;
import com.google.analytics.data.v1beta.Row;
import com.google.analytics.data.v1beta.RunReportRequest;
import com.google.analytics.data.v1beta.RunReportResponse;
import com.google.auth.oauth2.GoogleCredentials;

@RestController
public class AnalyticsController {

    private static final String PROPERTY_ID = "497710939"; // GA4 속성 ID 입력
    private static final String KEY_FILE_PATH = "/home/ubuntu/service-account.json";

    @GetMapping("/analytics/visitors")
    public Map<String, Object> getVisitors() throws IOException {
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

            List<Map<String, String>> dailyVisitors = new ArrayList<>();
            int totalVisitors = 0;

            for (Row row : response.getRowsList()) {
                String date = row.getDimensionValues(0).getValue();
                String visitors = row.getMetricValues(0).getValue();

                dailyVisitors.add(Map.of(
                        "date", date,
                        "visitors", visitors
                ));

                totalVisitors += Integer.parseInt(visitors);
            }//end for

            // 최종 반환 구조
            Map<String, Object> result = new HashMap<>();
            result.put("dailyVisitors", dailyVisitors);
            result.put("totalVisitors", totalVisitors);

            return result;
        }
        }//end get
   
    }//end class
