Feature: Puppeteer PoC

    @Record
    Scenario: News - Pass
        Given I am on "https://wccftech.com/"
        And I wait for "#unic-b > div > div > div > div.flex.flex-col.m-auto.w-full.items-center.justify-center" to render
        And I click the "#unic-b > div > div > div > div.flex.flex-col.m-auto.w-full.items-center.justify-center > div:nth-child(2) > button:nth-child(2)" button
        And I click the "body > header > div.topbar.headroom.headroom--top.headroom--not-bottom > div.container-xxl.tab-none > div > div:nth-child(3) > a.tap-target.search-toggle.tooltip-topbar" button
        And I wait for "body > header > div.search-wrapper.active > form > div > div.search-input" to render
        When I type "Snapdragon X Elite" into "#q" input field
        And I press Enter
        Then I should see "https://wccftech.com/" in the url

    Scenario: textinput - Testing123
        Given I am on "http://uitestingplayground.com/textinput"
        When I type "Testing123" into "#newButtonName" input field
        And I click the "#updatingButton" button
        Then "#updatingButton" will display "Testing123"

    Scenario: textinput - Testing
        Given I am on "http://uitestingplayground.com/textinput"
        When I type "Testing123" into "#newButtonName" input field
        And I click the "#updatingButton" button
        Then "#updatingButton" will display "Testing"
    
    @Screenshot
    Scenario: textinput - I like pasta
        Given I am on "http://uitestingplayground.com/textinput"
        When I type "I like pasta" into "#newButtonName" input field
        And I click the "#updatingButton" button
        Then "#updatingButton" will display "I like pasta"

    @Record
    Scenario: Puppeteer Replay Demo
        Given I am on "http://uitestingplayground.com"
        When I play the user flow recording "test playground input test.json"
        And I click the "#updatingButton" button
        Then "#updatingButton" will display "Recording Test"
        And I generate a Lighthouse User Flow report from "test playground input test.json"