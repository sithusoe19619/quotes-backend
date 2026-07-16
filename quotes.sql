--
-- PostgreSQL database dump
--

\restrict yQVNzAedbhhzarg7HuaSnaYzZjcV84LGsaZkQdvk9ODb4aGfkj80mn7gHFvXCDU

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: quotes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quotes (
    id integer NOT NULL,
    text character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quotes_id_seq OWNED BY public.quotes.id;


--
-- Name: quotes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotes ALTER COLUMN id SET DEFAULT nextval('public.quotes_id_seq'::regclass);


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quotes (id, text, author, "createdAt", "updatedAt") FROM stdin;
3	Absolute Cinema	Martin Scorsese	2026-07-08 20:41:14.423-04	2026-07-08 20:41:14.423-04
4	Each night as you sleep, I destroy the world.	Charles Manson	2026-07-08 20:42:45.64-04	2026-07-08 20:42:45.64-04
5	Workers of the world, Unite!!!	Karl Marx and Friedrich Engels	2026-07-08 20:46:35.958-04	2026-07-08 20:46:35.958-04
\.


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quotes_id_seq', 6, true);


--
-- Name: quotes quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict yQVNzAedbhhzarg7HuaSnaYzZjcV84LGsaZkQdvk9ODb4aGfkj80mn7gHFvXCDU

