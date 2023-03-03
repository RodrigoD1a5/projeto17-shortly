--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'bcf46a36-2cee-485a-8069-a652fcdffbbd', 1);
INSERT INTO public.sessions VALUES (2, '108babac-c5c9-4b9e-b506-d2e8f9ac5423', 1);
INSERT INTO public.sessions VALUES (3, '4136a319-58c6-4295-a59b-505a053b203b', 1);
INSERT INTO public.sessions VALUES (4, '7e022907-de75-4d78-8fe3-97f748816332', 1);
INSERT INTO public.sessions VALUES (5, '4c05ecd6-cd72-4d19-9905-65771706d519', 1);
INSERT INTO public.sessions VALUES (6, 'cbe9462c-e32e-4c7c-b509-8c59f63ee796', 1);
INSERT INTO public.sessions VALUES (7, 'c6611031-bc54-4ed3-83d5-c25d5c0b8aca', 1);
INSERT INTO public.sessions VALUES (8, 'f31ec2a4-7544-4944-acb7-07e9ecd9626b', 1);
INSERT INTO public.sessions VALUES (9, '5a6ed7a4-1531-407b-9425-66a24f273fb9', 1);
INSERT INTO public.sessions VALUES (10, 'e607ae88-de7d-4b06-97ea-11c1d3c02b0e', 1);
INSERT INTO public.sessions VALUES (11, 'ef7aba5c-a33a-4cbc-b7a0-ac377914d1f7', 1);
INSERT INTO public.sessions VALUES (12, '4db2fd5a-a68c-40de-be28-774b09541b6a', 1);
INSERT INTO public.sessions VALUES (13, '1644784d-eaa5-4d95-b0a6-99c74720fc1a', 1);
INSERT INTO public.sessions VALUES (14, 'e75bf258-4778-434d-bbba-552f7c499f8f', 1);
INSERT INTO public.sessions VALUES (15, '7058decb-28dc-463a-9e06-8068d212d8f2', 2);
INSERT INTO public.sessions VALUES (16, '9631997c-c874-428a-a513-828cb11068d0', 2);


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (1, 'https://...', 'GPz_8Z1V', 1, 5, '2023-03-02 21:22:27.475749');
INSERT INTO public.shortens VALUES (3, 'https://www.globo.com', 'VfYiro0f', 1, 2, '2023-03-03 10:16:01.902484');
INSERT INTO public.shortens VALUES (4, 'https://twitter.com/i/flow/login', 'Wp9icA2e', 2, 3, '2023-03-03 11:21:06.769074');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'joao@driven.com.br', '$2b$10$ivEC5lNxMKN6SkkWIhIDNeH3jdpExErdxHAk3.lBcngNCRJM5re16', 'João', '2023-03-02 17:58:48.014382');
INSERT INTO public.users VALUES (2, 'rodrigo@driven.com.br', '$2b$10$nROqe.TGBSE8ehIyVzHnb.edddpNTqMTNDDncZoHqd9C0eMsmJGd2', 'Rodrigo', '2023-03-02 17:59:05.919035');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 16, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

