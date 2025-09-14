# Časová osa vývoje a řešení problémů – `semester_page_subject`

Tento dokument zachycuje průběh vývoje projektu `semester_page_subject`, konkrétně části pro vedoucí předmětů. Zaznamenávám zde klíčové změny, problémy, které jsme řešili, a postupné úpravy, které vedly k funkční stránce s přehledem semestru.

---

## 1. Monorepo setup, začátky s Vite a příprava workspace

**Commity:**  
- [`new version 001, just work in progress`](https://github.com/otakarszaffner/frontendui/commit/913ca9798f0400bbfe3c1d027f6acbb9faa190e5)  
- [`vite tests`](https://github.com/otakarszaffner/frontendui/commit/61d38910ea5bde14f5beedee9b4578f88eb57245)  
- [`vite tests`](https://github.com/otakarszaffner/frontendui/commit/84add45c5357bf6292a9bb4b5156e9e60c61dbbe)

**Popis:**  
Na začátku jsme připravili základní strukturu monorepa a zkoušeli integraci s Vite. Byla to hlavně experimentální fáze — vše bylo "work in progress", ale položilo to základ pro další vývoj.

**Problémy a řešení:**  
- Nejasnosti v konfiguraci Vite pro více balíčků — vyřešeno postupným laděním a úpravami.

---

## 2. Zobrazení detailu semestru a režim jen pro čtení

**Commity:**  
- [`subject details – vypsání semestru`](https://github.com/otakarszaffner/frontendui/commit/cc5d278)  
- [`ReadOnly`](https://github.com/otakarszaffner/frontendui/commit/ed4da4a)  
- [`úprava read only stránky`](https://github.com/otakarszaffner/frontendui/commit/c622c48)

**Popis:**  
připravili jsme výpis detailů semestru a následně jsme upravili stránku do režimu pouze pro čtení, jak bylo požadováno.

---

## 3. Refaktoring, přidání garantů, změny názvu balíčku

**Commity:**  
- [`Rename package to @matika/semester_page_subject`](https://github.com/otakarszaffner/frontendui/commit/5c96047)  
- [`pridani garantu`](https://github.com/otakarszaffner/frontendui/commit/4aa9410)  
- [`uprava garantu`](https://github.com/otakarszaffner/frontendui/commit/1891860)

**Popis:**  
Přejmenovali jsme balíček, aby odpovídal naší struktuře (`@matika/semester_page_subject`). Současně jsem doplnil zobrazení garantů u semestru.

---

## 4. Buttons a první UI prvky

**Commity:**  
- [`Buttons`](https://github.com/otakarszaffner/frontendui/commit/0552a3a)  
- [`buttons`](https://github.com/otakarszaffner/frontendui/commit/6b69246)  
- [`pridal jsem buttony ale nefunguji, zatím jen na krásu neklikat`](https://github.com/otakarszaffner/frontendui/commit/96a2214)

**Popis:**  
Začali jsme přidávat tlačítka pro budoucí interakce. Některá zatím nebyla napojená na logiku – jen pro layout.

---

## 5. Rozšíření informací o semestru, záložky a grafika

**Commity:**  
- [`rozšíření popisu semestru, úprava semestru, místo pro popis semestru`](https://github.com/otakarszaffner/frontendui/commit/c2e5e3b)  
- [`přidání záložek v large card`](https://github.com/otakarszaffner/frontendui/commit/63ffdcc)  
- [`pouze grafická úprava témat`](https://github.com/otakarszaffner/frontendui/commit/8e6ddc3)

**Popis:**  
Rozšířili jsme možnosti zobrazení semestru, přidali pole pro popis a vylepšili UI rozložením do záložek. Také došlo na základní grafické úpravy.

---

## 6. Klasifikace, odkazy a další integrace

**Commity:**  
- [`nový odkaz, děláme přes semesterPage`](https://github.com/otakarszaffner/frontendui/commit/9e306b7)  
- [`přidány druhy klasifikace (jen ID)`](https://github.com/otakarszaffner/frontendui/commit/370b382)

**Popis:**  
Změnili jsme strukturu směrování (nový odkaz přes `semesterPage`) a připravili prostor pro práci s klasifikacemi.

---

## 7. Finalizace a merge

**Commity (výběr):**  
- [`Merge branch 'monorepo'...`](https://github.com/otakarszaffner/frontendui/commit/79ebdce)  
- [`finalizace struktury`](https://github.com/otakarszaffner/frontendui/commit/2cdc96f6d223d0da4a9a1b046a556887323de49b)  
- [`update README`](https://github.com/otakarszaffner/frontendui/commit/daf3ededdd5d84064c3c4031f632a2ae6243fb09)

**Popis:**  
Proběhlo několik merge commitů, během nichž se sjednocovali projekt k finální podobě. Finalizovali jsme strukturu a projekt připravili pro další použití.

---

## 8. Doúprava

**Commity (výběr):** 
- [`úprava čitelnosti kodu`](https://github.com/otakarszaffner/frontendui/commit/d9dc4f4dc1f1e92dd981e283af9d394aede8e496)

**Popis:**
proběhla ještě poslední doúprava kodu ve které se vytvořili nové komponenty které zajištují lepší čitelnost.

> **Poznámka:**  
Toto je osobní zápis založený na vývojové historii projektu. Kompletní historii změn si můžeš projít [v pull requestu Monorepo #1](https://github.com/otakarszaffner/frontendui/pull/1) nebo [v seznamu commitů](https://github.com/otakarszaffner/frontendui/pull/1/commits).
