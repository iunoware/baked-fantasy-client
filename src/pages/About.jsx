import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = ["/images/cake-bg-1.png", "/images/cake-bg-2.png"];

function About() {
  // for hero section slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000; // 3 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  // timeline milestones
  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started our journey as a small home bakery, baking fresh cakes and treats with love.",
      icon: (
        <svg
          fill="#B45309"
          width="35px"
          className="pl-[3px]"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          stroke="#B45309"
          stroke-width="0.00032"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M6.33,18.45v8.59c0,.41,.34,.75,.75,.75h15.13c.41,0,.75-.34,.75-.75v-8.6c1.91-.75,3.27-2.6,3.27-4.77,0-2.83-2.3-5.13-5.13-5.13-.56,0-1.13,.1-1.67,.28-1.2-1.87-3.24-3.01-5.49-3.01s-4.09,1.02-5.31,2.75c-3.06-.27-5.56,2.14-5.56,5.11,0,2.17,1.36,4.02,3.27,4.77Zm1.5,7.84v-1.87h13.63v1.87H7.83Zm13.63-7.48v4.11H7.83v-4.11h13.63ZM8.19,10.05c.18,0,.36,.02,.56,.05,0,0,.01,0,.02,0,1.72,.33,2.97,1.83,2.97,3.57,0,.41,.34,.75,.75,.75s.75-.34,.75-.75c0-2.05-1.23-3.85-3.04-4.67,.94-1.07,2.29-1.7,3.74-1.7,1.91,0,3.64,1.07,4.5,2.79,.09,.18,.25,.31,.43,.38,.19,.06,.39,.05,.57-.04,.52-.26,1.09-.4,1.65-.4,2,0,3.63,1.63,3.63,3.63s-1.63,3.63-3.63,3.63H8.19c-2,0-3.63-1.63-3.63-3.63s1.63-3.63,3.63-3.63Z"></path>
          </g>
        </svg>
      ),
    },
    {
      year: "2021",
      title: "First Bakery Store",
      description:
        "Opened our first bakery shop and welcomed our very first walk-in customers.",
      icon: (
        <svg
          fill="#B45309"
          width="30px"
          viewBox="0 0 60 60"
          id="Capa_1"
          version="1.1"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path d="M59.909,11.709c-0.002-0.109-0.014-0.218-0.044-0.324l-0.146,0.042c-0.002-0.003-0.003-0.006-0.006-0.008l0.149-0.044 C58.225,5.361,53.122,0.946,47,0.14V0L31,0v0h-0.181h-1.639H29v0.001l-14.002,0C8.069,0.013,1.959,4.689,0.142,11.362 C0.11,11.473,0.099,11.586,0.097,11.7C0.036,11.841,0,11.996,0,12.16V14v46h39h17h4V14v-1.84C60,12,59.967,11.848,59.909,11.709z M45.93,2.04c5.371,0.381,9.974,3.94,11.724,8.96H45h-0.204c-0.938-3.868-3.391-7.069-6.661-9h6.841L45.93,2.04z M43,14 c0,3.309-2.691,6-6,6s-6-2.691-6-6v-1h12V14z M17,13h12v1c0,3.309-2.691,6-6,6s-6-2.691-6-6V13z M31,2.001 C36.511,2.08,41.259,5.776,42.742,11H31V2.001z M29,11H17.258C18.741,5.776,23.489,2.08,29,2.001V11z M15.023,2h6.841 c-3.27,1.931-5.723,5.132-6.661,9H15H2.348C4.212,5.666,9.288,2.011,15.023,2z M2,13h12.802H15v1c0,3.309-2.691,6-6,6H8 c-3.309,0-6-2.691-6-6V13z M54,44H41V33.5c0-3.584,2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5V44z M41,58V46h13v12H41z M58,19.286V58h-2 V33.5c0-4.687-3.813-8.5-8.5-8.5S39,28.813,39,33.5V54c-0.553,0-1,0.447-1,1s0.447,1,1,1v1h-1c-0.553,0-1,0.447-1,1h-1 c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1h-1c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1h-1c0-0.553-0.447-1-1-1h-1 c-0.553,0-1,0.447-1,1h-1c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1h-1c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1h-1 c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1h-1c0-0.553-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1H8c0-0.553-0.447-1-1-1H6 c-0.553,0-1,0.447-1,1H4c0-0.553-0.447-1-1-1H2v-2V19.286c0.05,0.057,0.108,0.108,0.16,0.163c0.102,0.109,0.206,0.217,0.314,0.321 c0.086,0.083,0.175,0.162,0.265,0.241c0.112,0.098,0.226,0.193,0.343,0.285c0.094,0.074,0.19,0.145,0.287,0.215 c0.121,0.087,0.246,0.169,0.372,0.249c0.101,0.064,0.202,0.127,0.306,0.186c0.132,0.075,0.267,0.145,0.403,0.213 c0.105,0.053,0.21,0.106,0.318,0.154c0.143,0.063,0.289,0.119,0.435,0.174c0.108,0.041,0.215,0.083,0.325,0.119 c0.157,0.051,0.317,0.092,0.477,0.133c0.106,0.027,0.21,0.059,0.318,0.082c0.181,0.039,0.365,0.065,0.55,0.091 c0.092,0.013,0.182,0.032,0.275,0.042C7.429,21.983,7.712,22,8,22h1c0.338,0,0.669-0.028,0.996-0.069 c0.094-0.012,0.187-0.028,0.28-0.043c0.247-0.04,0.489-0.091,0.728-0.153c0.083-0.021,0.166-0.04,0.248-0.064 c0.307-0.09,0.607-0.195,0.898-0.32c0.045-0.019,0.086-0.043,0.13-0.063c0.247-0.112,0.487-0.236,0.721-0.372 c0.081-0.047,0.159-0.095,0.238-0.145c0.212-0.133,0.416-0.275,0.614-0.427c0.055-0.042,0.113-0.081,0.167-0.125 c0.243-0.196,0.474-0.406,0.692-0.629c0.049-0.05,0.094-0.104,0.142-0.156c0.169-0.182,0.329-0.371,0.481-0.567 c0.057-0.074,0.113-0.148,0.167-0.224c0.157-0.219,0.303-0.445,0.437-0.679c0.019-0.033,0.043-0.063,0.062-0.096 c0.019,0.033,0.043,0.063,0.062,0.096c0.134,0.234,0.281,0.46,0.437,0.679c0.054,0.076,0.11,0.15,0.167,0.224 c0.152,0.197,0.312,0.386,0.481,0.567c0.048,0.052,0.092,0.106,0.142,0.156c0.218,0.223,0.449,0.433,0.692,0.629 c0.054,0.044,0.112,0.083,0.167,0.125c0.198,0.152,0.402,0.294,0.614,0.427c0.079,0.049,0.157,0.098,0.238,0.145 c0.233,0.135,0.473,0.26,0.721,0.372c0.044,0.02,0.086,0.044,0.13,0.063c0.29,0.125,0.591,0.23,0.898,0.32 c0.082,0.024,0.165,0.042,0.248,0.064c0.239,0.062,0.481,0.113,0.728,0.153c0.093,0.015,0.186,0.031,0.28,0.043 C22.331,21.972,22.662,22,23,22s0.669-0.028,0.996-0.069c0.094-0.012,0.187-0.028,0.28-0.043c0.247-0.04,0.489-0.091,0.728-0.153 c0.083-0.021,0.166-0.04,0.248-0.064c0.307-0.09,0.607-0.195,0.898-0.32c0.045-0.019,0.086-0.043,0.13-0.063 c0.247-0.112,0.487-0.236,0.721-0.372c0.081-0.047,0.159-0.095,0.238-0.145c0.212-0.133,0.416-0.275,0.614-0.427 c0.055-0.042,0.113-0.081,0.167-0.125c0.243-0.196,0.474-0.406,0.692-0.629c0.049-0.05,0.094-0.104,0.142-0.156 c0.169-0.182,0.329-0.371,0.481-0.567c0.057-0.074,0.113-0.148,0.167-0.224c0.157-0.219,0.303-0.445,0.437-0.679 c0.019-0.033,0.043-0.063,0.062-0.096c0.019,0.033,0.043,0.063,0.062,0.096c0.134,0.234,0.281,0.46,0.437,0.679 c0.054,0.076,0.11,0.15,0.167,0.224c0.152,0.197,0.312,0.386,0.481,0.567c0.048,0.052,0.092,0.106,0.142,0.156 c0.218,0.223,0.449,0.433,0.692,0.629c0.054,0.044,0.112,0.083,0.167,0.125c0.198,0.152,0.402,0.294,0.614,0.427 c0.079,0.049,0.157,0.098,0.238,0.145c0.233,0.135,0.473,0.26,0.721,0.372c0.044,0.02,0.086,0.044,0.13,0.063 c0.29,0.125,0.591,0.23,0.898,0.32c0.082,0.024,0.165,0.042,0.248,0.064c0.239,0.062,0.481,0.113,0.728,0.153 c0.093,0.015,0.186,0.031,0.28,0.043C36.331,21.972,36.662,22,37,22s0.669-0.028,0.996-0.069c0.094-0.012,0.187-0.028,0.28-0.043 c0.247-0.04,0.489-0.091,0.728-0.153c0.083-0.021,0.166-0.04,0.248-0.064c0.307-0.09,0.607-0.195,0.898-0.32 c0.045-0.019,0.086-0.043,0.13-0.063c0.247-0.112,0.487-0.236,0.721-0.372c0.081-0.047,0.159-0.095,0.238-0.145 c0.212-0.133,0.416-0.275,0.614-0.427c0.055-0.042,0.113-0.081,0.167-0.125c0.243-0.196,0.474-0.406,0.692-0.629 c0.049-0.05,0.094-0.104,0.142-0.156c0.169-0.182,0.329-0.371,0.481-0.567c0.057-0.074,0.113-0.148,0.167-0.224 c0.157-0.219,0.303-0.445,0.437-0.679c0.019-0.033,0.043-0.063,0.062-0.096c0.019,0.033,0.043,0.063,0.062,0.096 c0.134,0.234,0.281,0.46,0.437,0.679c0.054,0.076,0.11,0.15,0.167,0.224c0.152,0.197,0.312,0.386,0.481,0.567 c0.048,0.052,0.092,0.106,0.142,0.156c0.218,0.223,0.449,0.433,0.692,0.629c0.054,0.044,0.112,0.083,0.167,0.125 c0.198,0.152,0.402,0.294,0.614,0.427c0.079,0.049,0.157,0.098,0.238,0.145c0.233,0.135,0.473,0.26,0.721,0.372 c0.044,0.02,0.086,0.044,0.13,0.063c0.29,0.125,0.591,0.23,0.898,0.32c0.082,0.024,0.165,0.042,0.248,0.064 c0.239,0.062,0.481,0.113,0.728,0.153c0.093,0.015,0.186,0.031,0.28,0.043C50.331,21.972,50.662,22,51,22h1 c0.288,0,0.571-0.017,0.851-0.047c0.093-0.01,0.183-0.029,0.276-0.042c0.185-0.026,0.369-0.053,0.55-0.091 c0.108-0.023,0.212-0.055,0.318-0.082c0.16-0.041,0.321-0.082,0.477-0.133c0.11-0.036,0.217-0.079,0.325-0.119 c0.147-0.055,0.293-0.111,0.435-0.174c0.108-0.048,0.213-0.101,0.318-0.154c0.136-0.068,0.271-0.137,0.403-0.213 c0.104-0.059,0.205-0.122,0.306-0.186c0.126-0.08,0.25-0.162,0.371-0.249c0.098-0.07,0.194-0.142,0.288-0.216 c0.117-0.092,0.23-0.186,0.342-0.284c0.09-0.079,0.179-0.158,0.265-0.241c0.108-0.104,0.211-0.211,0.314-0.321 C57.892,19.394,57.95,19.343,58,19.286z M52,20h-1c-3.309,0-6-2.691-6-6v-1h0.198H58v1C58,17.309,55.309,20,52,20z"></path>{" "}
              <path d="M4,53h33V25H4V53z M6,27h29v24H6V27z"></path>{" "}
              <path d="M15,38c0.256,0,0.512-0.098,0.707-0.293l4-4c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-4,4 c-0.391,0.391-0.391,1.023,0,1.414C14.488,37.902,14.744,38,15,38z"></path>{" "}
              <path d="M15,43c0.256,0,0.512-0.098,0.707-0.293l2-2c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-2,2 c-0.391,0.391-0.391,1.023,0,1.414C14.488,42.902,14.744,43,15,43z"></path>{" "}
              <path d="M18.29,37.29C18.109,37.479,18,37.74,18,38s0.109,0.52,0.29,0.71C18.479,38.89,18.74,39,19,39s0.52-0.11,0.71-0.29 C19.89,38.52,20,38.26,20,38s-0.11-0.521-0.29-0.71C19.34,36.92,18.66,36.92,18.29,37.29z"></path>{" "}
              <path d="M20.293,36.707C20.488,36.902,20.744,37,21,37s0.512-0.098,0.707-0.293l3-3c0.391-0.391,0.391-1.023,0-1.414 s-1.023-0.391-1.414,0l-3,3C19.902,35.684,19.902,36.316,20.293,36.707z"></path>{" "}
              <path d="M23.293,37.293l-9,9c-0.391,0.391-0.391,1.023,0,1.414C14.488,47.902,14.744,48,15,48s0.512-0.098,0.707-0.293l9-9 c0.391-0.391,0.391-1.023,0-1.414S23.684,36.902,23.293,37.293z"></path>{" "}
              <path d="M25.29,35.29C25.109,35.479,25,35.729,25,36c0,0.27,0.109,0.52,0.29,0.71C25.479,36.89,25.729,37,26,37 c0.27,0,0.52-0.11,0.7-0.29C26.89,36.52,27,36.26,27,36c0-0.271-0.11-0.521-0.29-0.71C26.34,34.92,25.66,34.92,25.29,35.29z"></path>{" "}
              <path d="M8,54H7c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S8.553,54,8,54z"></path>{" "}
              <path d="M3,56h1c0.553,0,1-0.447,1-1s-0.447-1-1-1H3c-0.553,0-1,0.447-1,1S2.447,56,3,56z"></path>{" "}
              <path d="M16,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S16.553,54,16,54z"></path>{" "}
              <path d="M12,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S12.553,54,12,54z"></path>{" "}
              <path d="M24,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S24.553,54,24,54z"></path>{" "}
              <path d="M20,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S20.553,54,20,54z"></path>{" "}
              <path d="M32,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S32.553,54,32,54z"></path>{" "}
              <path d="M28,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S28.553,54,28,54z"></path>{" "}
              <path d="M36,54h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S36.553,54,36,54z"></path>{" "}
            </g>{" "}
            <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>{" "}
            <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>{" "}
          </g>
        </svg>
      ),
    },
    {
      year: "2022",
      title: "Signature Cakes Launched",
      description: "Introduced our signature customized cakes and special dessert menu.",
      icon: (
        <svg
          width="35px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#B45309"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 15.9248C3 13.5162 3.51623 13 5.9248 13H18.0752C20.4838 13 21 13.5162 21 15.9248V18.0752C21 20.4838 20.4838 21 18.0752 21H5.9248C3.51623 21 3 20.4838 3 18.0752V15.9248Z"
              stroke="#B45309"
              stroke-width="1.152"
            ></path>
            <path
              d="M6 13V11.656C6 9.46878 6.46878 9 8.656 9H15.344C17.5312 9 18 9.46878 18 11.656V13"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
            ></path>
            <path
              d="M9 9V7"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9 3.5V3"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M15 9V7"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M15 3.5V3"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 9V7"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 3.5V3"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 16.0397C3.30926 16.0122 3.63847 16 4 16C5.61017 16 6.38983 17 8 17C9.61017 17 10.3898 16 12 16C13.6102 16 14.3898 17 16 17C17.6102 17 18.3898 16 20 16C20.3615 16 20.6907 16.0122 21 16.0397"
              stroke="#B45309"
              stroke-width="1.152"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      year: "2023",
      title: "Event & Celebration Cakes",
      description:
        "Expanded our services to create cakes for weddings, birthdays, and big celebrations.",
      icon: (
        <svg
          width="35px"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          stroke-width="2.112"
          stroke="#B45309"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="1.536"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M14,39.87,24.59,50.51s33-14,31.23-42.29C55.82,8.22,29.64,4.28,14,39.87Z"></path>
            <path d="M44.69,9.09a12.3,12.3,0,0,0,3.48,6.73,12.31,12.31,0,0,0,7,3.52"></path>
            <circle cx="39.46" cy="24.56" r="6.2"></circle>
            <path d="M14.89,37.82l-5.3.68a.27.27,0,0,1-.28-.37l3.93-9a2.65,2.65,0,0,1,1.88-1.53l6.59-1.38"></path>
            <path d="M26.55,49.4l-.69,5.3a.27.27,0,0,0,.37.28l9-3.92a2.69,2.69,0,0,0,1.53-1.89l1.38-6.59"></path>
            <path d="M22.21,48.13c-2.37,7.41-14.1,7.78-14.1,7.78S8,44.51,15.76,41.67"></path>
          </g>
        </svg>
      ),
    },
    {
      year: "2024",
      title: "Online Ordering & Delivery",
      description:
        "Launched online ordering and started delivering our fresh bakes across the city.",
      icon: (
        <svg
          width="35px"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          stroke-width="1.984"
          stroke="#B45309"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M21.68,42.22H37.17a1.68,1.68,0,0,0,1.68-1.68L44.7,19.12A1.68,1.68,0,0,0,43,17.44H17.61a1.69,1.69,0,0,0-1.69,1.68l-5,21.42a1.68,1.68,0,0,0,1.68,1.68h2.18"></path>
            <path d="M41.66,42.22H38.19l5-17.29h8.22a.85.85,0,0,1,.65.3l3.58,6.3a.81.81,0,0,1,.2.53L52.51,42.22h-3.6"></path>
            <ellipse cx="18.31" cy="43.31" rx="3.71" ry="3.76"></ellipse>
            <ellipse cx="45.35" cy="43.31" rx="3.71" ry="3.76"></ellipse>
            <line
              x1="23.25"
              y1="22.36"
              x2="6.87"
              y2="22.36"
              stroke-linecap="round"
            ></line>
            <line x1="20.02" y1="27.6" x2="8.45" y2="27.6" stroke-linecap="round"></line>
            <line x1="21.19" y1="33.5" x2="3.21" y2="33.5" stroke-linecap="round"></line>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* hero section */}
      <div className="relative w-full h-170 overflow-hidden rounded-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-170 object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Optional: Previous/Next buttons */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>

      {/* time line section */}
      <section className="pt-16  bg-blue-500/60 bg-[url('/images/swirl.png')]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              From a passionate home baker to a skilled academy instructor and a thriving
              large-scale home bakery, our journey is driven by love for the craft and
              dedication to sharing it with others.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-40 rounded-lg bg-[url(/images/candle-bg-3.png)] bg-center bg-cover bg-no-repeat h-full hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    <div className="border-2 rounded-xl hover:shadow-xl bg-white/70 bg-cover border-transparent hover:scale-105 hover:border-amber-800 transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center mr-4">
                            {milestone.icon}
                          </div>
                          <div>
                            {/* year */}
                            {/* <div className="text-2xl font-bold text-amber-700">
                              {milestone.year}
                            </div> */}

                            {/* title */}
                            <h3 className="text-xl font-bold text-amber-800">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-black">{milestone.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  {/* <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-amber-700 rounded-full border-4 border-white shadow-lg"></div>
                  </div> */}

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <div className="bg-blue-500/60 bg-[url('/images/swirl.png')]">
        <section class="overflow-hidden bg-[url(/images/cta-cake-bg-3.png)] pt-40 bg-center sm:grid sm:grid-cols-2 sm:items-center">
          <div class="p-8 md:p-12 lg:px-16 lg:py-24">
            <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 class="!text-4xl font-bold mb-5 text-gray-900 pt-60 md:text-3xl">
                Turn Your Passion for <span className="text-rose-500">Baking</span> Into{" "}
                <span className="text-rose-500">Perfection</span>
              </h2>

              <p class="hidden text-xl mb-5 text-gray-800 md:mt-4 md:block">
                Join our academy and transform your home baking skills into professional
                expertise - from homemade treats to large-scale success!
              </p>

              <div class="mt-4 flex md:mt-8">
                <Link
                  className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                  to="/courses"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg
                      className="size-5 rtl:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M16.1007 13.359L15.5719 12.8272H15.5719L16.1007 13.359ZM16.5562 12.9062L17.085 13.438H17.085L16.5562 12.9062ZM18.9728 12.5894L18.6146 13.2483L18.9728 12.5894ZM20.8833 13.628L20.5251 14.2869L20.8833 13.628ZM21.4217 16.883L21.9505 17.4148L21.4217 16.883ZM20.0011 18.2954L19.4723 17.7636L20.0011 18.2954ZM18.6763 18.9651L18.7459 19.7119H18.7459L18.6763 18.9651ZM8.81536 14.7266L9.34418 14.1947L8.81536 14.7266ZM4.00289 5.74561L3.2541 5.78816L3.2541 5.78816L4.00289 5.74561ZM10.4775 7.19738L11.0063 7.72922H11.0063L10.4775 7.19738ZM10.6342 4.54348L11.2346 4.09401L10.6342 4.54348ZM9.37326 2.85908L8.77286 3.30855V3.30855L9.37326 2.85908ZM6.26145 2.57483L6.79027 3.10667H6.79027L6.26145 2.57483ZM4.69185 4.13552L4.16303 3.60368H4.16303L4.69185 4.13552ZM12.0631 11.4972L12.5919 10.9654L12.0631 11.4972ZM16.6295 13.8909L17.085 13.438L16.0273 12.3743L15.5719 12.8272L16.6295 13.8909ZM18.6146 13.2483L20.5251 14.2869L21.2415 12.9691L19.331 11.9305L18.6146 13.2483ZM20.8929 16.3511L19.4723 17.7636L20.5299 18.8273L21.9505 17.4148L20.8929 16.3511ZM18.6067 18.2184C17.1568 18.3535 13.4056 18.2331 9.34418 14.1947L8.28654 15.2584C12.7186 19.6653 16.9369 19.8805 18.7459 19.7119L18.6067 18.2184ZM9.34418 14.1947C5.4728 10.3453 4.83151 7.10765 4.75168 5.70305L3.2541 5.78816C3.35456 7.55599 4.14863 11.144 8.28654 15.2584L9.34418 14.1947ZM10.7195 8.01441L11.0063 7.72922L9.9487 6.66555L9.66189 6.95073L10.7195 8.01441ZM11.2346 4.09401L9.97365 2.40961L8.77286 3.30855L10.0338 4.99296L11.2346 4.09401ZM5.73263 2.04299L4.16303 3.60368L5.22067 4.66736L6.79027 3.10667L5.73263 2.04299ZM10.1907 7.48257C9.66189 6.95073 9.66117 6.95144 9.66045 6.95216C9.66021 6.9524 9.65949 6.95313 9.659 6.95362C9.65802 6.95461 9.65702 6.95561 9.65601 6.95664C9.65398 6.95871 9.65188 6.96086 9.64972 6.9631C9.64539 6.96759 9.64081 6.97245 9.63599 6.97769C9.62634 6.98816 9.61575 7.00014 9.60441 7.01367C9.58174 7.04072 9.55605 7.07403 9.52905 7.11388C9.47492 7.19377 9.41594 7.2994 9.36589 7.43224C9.26376 7.70329 9.20901 8.0606 9.27765 8.50305C9.41189 9.36833 10.0078 10.5113 11.5343 12.0291L12.5919 10.9654C11.1634 9.54499 10.8231 8.68059 10.7599 8.27309C10.7298 8.07916 10.761 7.98371 10.7696 7.96111C10.7748 7.94713 10.7773 7.9457 10.7709 7.95525C10.7677 7.95992 10.7624 7.96723 10.7541 7.97708C10.75 7.98201 10.7451 7.98759 10.7394 7.99381C10.7365 7.99692 10.7335 8.00019 10.7301 8.00362C10.7285 8.00534 10.7268 8.00709 10.725 8.00889C10.7241 8.00979 10.7232 8.0107 10.7223 8.01162C10.7219 8.01208 10.7212 8.01278 10.7209 8.01301C10.7202 8.01371 10.7195 8.01441 10.1907 7.48257ZM11.5343 12.0291C13.0613 13.5474 14.2096 14.1383 15.0763 14.2713C15.5192 14.3392 15.8763 14.285 16.1472 14.1841C16.28 14.1346 16.3858 14.0763 16.4658 14.0227C16.5058 13.9959 16.5392 13.9704 16.5663 13.9479C16.5799 13.9367 16.5919 13.9262 16.6024 13.9166C16.6077 13.9118 16.6126 13.9073 16.6171 13.903C16.6194 13.9008 16.6215 13.8987 16.6236 13.8967C16.6246 13.8957 16.6256 13.8947 16.6266 13.8937C16.6271 13.8932 16.6279 13.8925 16.6281 13.8923C16.6288 13.8916 16.6295 13.8909 16.1007 13.359C15.5719 12.8272 15.5726 12.8265 15.5733 12.8258C15.5735 12.8256 15.5742 12.8249 15.5747 12.8244C15.5756 12.8235 15.5765 12.8226 15.5774 12.8217C15.5793 12.82 15.581 12.8183 15.5827 12.8166C15.5862 12.8133 15.5895 12.8103 15.5926 12.8074C15.5988 12.8018 15.6044 12.7969 15.6094 12.7929C15.6192 12.7847 15.6265 12.7795 15.631 12.7764C15.6403 12.7702 15.6384 12.773 15.6236 12.7785C15.5991 12.7876 15.501 12.8189 15.3038 12.7886C14.8905 12.7253 14.02 12.3853 12.5919 10.9654L11.5343 12.0291ZM9.97365 2.40961C8.95434 1.04802 6.94996 0.83257 5.73263 2.04299L6.79027 3.10667C7.32195 2.578 8.26623 2.63181 8.77286 3.30855L9.97365 2.40961ZM4.75168 5.70305C4.73201 5.35694 4.89075 4.9954 5.22067 4.66736L4.16303 3.60368C3.62571 4.13795 3.20329 4.89425 3.2541 5.78816L4.75168 5.70305ZM19.4723 17.7636C19.1975 18.0369 18.9029 18.1908 18.6067 18.2184L18.7459 19.7119C19.4805 19.6434 20.0824 19.2723 20.5299 18.8273L19.4723 17.7636ZM11.0063 7.72922C11.9908 6.7503 12.064 5.2019 11.2346 4.09401L10.0338 4.99295C10.4373 5.53193 10.3773 6.23938 9.9487 6.66555L11.0063 7.72922ZM20.5251 14.2869C21.3429 14.7315 21.4703 15.7769 20.8929 16.3511L21.9505 17.4148C23.2908 16.0821 22.8775 13.8584 21.2415 12.9691L20.5251 14.2869ZM17.085 13.438C17.469 13.0562 18.0871 12.9616 18.6146 13.2483L19.331 11.9305C18.2474 11.3414 16.9026 11.5041 16.0273 12.3743L17.085 13.438Z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Our Courses
                  </span>
                </Link>

                <Link
                  className="group relative bg-rose-500 inline-flex items-center overflow-hidden rounded-sm border border-current px-3 py-3 text-pink-600 focus:ring-3 focus:outline-hidden"
                  to="/products"
                >
                  <span className="absolute -start-full transition-all group-hover:start-1">
                    <svg
                      className="size-5 rtl:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </span>

                  <span className="text-sm text-white font-medium transition-all group-hover:ms-4">
                    Our Products
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* <img
          alt=""
          src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="h-full w-full object-cover "
        /> */}
        </section>
      </div>

      <section className="awards py-16 md:py-24 bg-sky-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-12">
            Awards & Recognition
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Images */}
            <div className="space-y-6">
              <div className="relative">
                <img
                  src="/images/award-img-1.jpg"
                  alt="Award ceremony trophy"
                  className="w-full h-72 rounded-xl shadow-md object-cover"
                />
              </div>
              <div className="relative">
                <img
                  src="/images/award-img-2.jpg"
                  alt="Bakery recognition certificate"
                  className="w-full h-72 rounded-xl shadow-md object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-orange-900 mb-4">
                  Recognized Excellence
                </h3>
                <p className="text-base text-black/80 leading-relaxed">
                  Our commitment to quality craftsmanship and exceptional customer service
                  has been recognized by industry leaders and our community. These awards
                  reflect our dedication to traditional baking methods and innovative
                  approaches to creating memorable experiences.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                  {/* Award icon */}
                  <div className="w-8 h-8 text-orange-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                    </svg>
                  </div>

                  {/* Award info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">Rising star</h4>
                    {/* <p className="text-sm text-black/70">{award.organization}</p> */}
                    <p className="text-sm text-orange-900 font-medium">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
