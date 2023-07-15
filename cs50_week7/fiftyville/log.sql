-- Keep a log of any SQL queries you execute as you solve the mystery.
SELECT description
    FROM crime_scene_reports
        WHERE year = 2021 AND month = 7 AND day = 28 AND street = "Humphrey Street";
--Duck ws stolen at 10:15 from the bakery.
SELECT transcript
    FROM interviews
        WHERE year = 2021 AND month = 7 AND day = 28;

--Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away.
SELECT license_plate
    FROM bakery_security_logs
        WHERE year = 2021 AND month = 7 AND day = 28 AND hour = 10 AND minute > 15 AND minute <= 25;
        --Possible license plates: 5P2BI95, 94KL13X, 6P58WS2, 4328GD8, G412CB7, L93JTIZ, 322W7JE, 0NTHK55

--I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery,
--I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.
SELECT id,atm_transactions.account_number,amount, person_id, creation_year,
    FROM atm_transactions JOIN bank_accounts ON atm_transactions.account_number = bank_accounts.account_number
        WHERE year = 2021 AND month = 7 AND day = 28 AND atm_location = "Leggett Street" AND transaction_type = "withdraw";

    --+-----+----------------+--------+-----------+---------------+
    --| id  | account_number | amount | person_id | creation_year |
    --+-----+----------------+--------+-----------+---------------+
    --| 246 | 28500762       | 48     | 467400    | 2014          |
    --| 264 | 28296815       | 20     | 395717    | 2014          |
    --| 266 | 76054385       | 60     | 449774    | 2015          |
    --| 267 | 49610011       | 50     | 686048    | 2010          |
    --| 269 | 16153065       | 80     | 458378    | 2012          |
    --| 288 | 25506511       | 20     | 396669    | 2014          |
    --| 313 | 81061156       | 30     | 438727    | 2018          |
    --| 336 | 26013199       | 35     | 514354    | 2012          |
    --+-----+----------------+--------+-----------+---------------+


-- As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call,
--I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow.
--The thief then asked the person on the other end of the phone to purchase the flight ticket.
SELECT city, hour, minute, airports.id, destination_airport_id FROM airports JOIN flights ON airports.id = origin_airport_id WHERE origin_airport_id IN
        (SELECT id FROM airports WHERE city = "Fiftyville") AND year = 2021 AND month = 7 AND day = 29 AND hour < 12;
SELECT city FROM airports WHERE id = 4;

SELECT name, phone_number
    FROM people
        WHERE passport_number IN
            (SELECT passport_number FROM passengers WHERE flight_id IN
                (SELECT id FROM flights WHERE destination_airport_id IN
                    (SELECT id FROM airports WHERE city = "New York City")))
        AND phone_number IN
            (SELECT caller
                FROM phone_calls
                    WHERE year = 2021 AND month = 7 AND day = 28 AND duration <= 60)
        AND license_plate IN
            (SELECT license_plate
                FROM bakery_security_logs
                    WHERE year = 2021 AND month = 7 AND day = 28 AND hour = 10 AND minute > 15 AND minute <= 25)
        AND id IN
            (SELECT person_Id
                FROM bank_accounts JOIN atm_transactions ON bank_accounts.account_number = atm_transactions.account_number
                    WHERE year = 2021 AND month = 7 AND day = 28 AND atm_location = "Leggett Street" AND transaction_type = "withdraw");
--ITS BRUCE


SELECT receiver FROM phone_calls WHERE caller = "(367) 555-5533" AND year = 2021 AND month = 7 AND day = 28 AND duration <= 60;
--(375) 555-8161
SELECT name FROM people where phone_number = "(375) 555-8161";