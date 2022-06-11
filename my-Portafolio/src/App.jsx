import React, { Suspense } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import Tenzies from "./page/tenzies/Tenzies";
import { Quizzical } from "./page/quizzical/Quizzical";
import Quiz from "./page/quizzical/Quiz";
import { Loader, Center, Menu, Divider, Burger } from "@mantine/core";

export default function App() {
  return (
    <Suspense
      fallback={
        <Center inline style={{ width: "100%", height: 200 }}>
          <Loader variant="bars" />
        </Center>
      }
    >
      <Menu control={<Burger />} trigger="hover" delay={500}>
        <Menu.Item component={Link} to="/">
          Tenzzies
        </Menu.Item>
        <Divider />
        <Menu.Item component={Link} to="/quizzical">
          Quizzical
        </Menu.Item>
      </Menu>
      <Routes>
        <Route path="/" element={<Tenzies />} />
        <Route path="quizzical" element={<Quizzical />}></Route>
        <Route path="quiz" element={<Quiz />}></Route>
      </Routes>
    </Suspense>
  );
}
